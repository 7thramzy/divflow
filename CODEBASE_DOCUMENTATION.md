# توثيق مشروع DivFlow Frontend

## أولاً: هيكل المشروع الكامل

```text
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\admin\layout.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\admin\logs\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\admin\users\[id]\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\admin\users\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\customers\[id]\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\customers\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\notes\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\payouts\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\projects\[id]\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\projects\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\tasks\[id]\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\tasks\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\dashboard\time-logs\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\layout.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\(dashboard)\settings\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\forgot-password\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\layout.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\login\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\app\page.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\Header.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\MediaUploader.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ProjectMembersPanel.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\PWARegister.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\Sidebar.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ui\Drawer.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ui\Modal.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ui\Pagination.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ui\SkeletonTable.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ui\SortableHeader.tsx
D:\devlopz\divlopz1\div_flow_frontend\components\ui\StatusBadge.tsx
D:\devlopz\divlopz1\div_flow_frontend\lib\api.ts
D:\devlopz\divlopz1\div_flow_frontend\lib\constants.ts
D:\devlopz\divlopz1\div_flow_frontend\lib\store.ts
D:\devlopz\divlopz1\div_flow_frontend\lib\types.ts
D:\devlopz\divlopz1\div_flow_frontend\lib\utils.tsx
```

## ثانياً: ملفات المكتبات والإعدادات (lib/ & components/Sidebar.tsx)

### `lib/utils.tsx`
يحتوي على دوال مساعدة عامة:
- `cn(...inputs: ClassValue[]): string`: دمج فئات Tailwind CSS بشكل متوافق (باستخدام clsx و tailwind-merge).
- `getStatusBadge(status: string): string`: ترجع سلسلة تمثل فئات Tailwind للون شارة الحالة بناءً على نوع الكلمة المفتاحية (قيد الانتظار، نشط، مكتمل، إلخ). تغطي الحالات: `pending`, `in_progress`, `active`, `completed`, `cancelled`, `on_hold`, والأنواع `payment`, `deduction`, `critical`, `high`, إلخ.
- `getStatusLabel(status: string): string`: ترجع الترجمة العربية لكل رمز حالة باللغة الإنجليزية.
- `getRoleBadge(role: string): string`: ترجع الستايل بناءً على دور المستخدم (admin, manager, employee, client).
- `formatCurrency(amount: number): string`: تنسيق قيمة رقمية كعملة دولارية (مثلاً $1,000.00).
- `formatHours(hours: number): string`: تنسيق الساعات بشكل نصي بإضافة "h" بجوار الرقم.
- `exportToCSV(data: any[], filename: string): void`: توليد وتحميل ملف CSV من مصفوفة كائنات مع ترميز UTF-8.

### `lib/constants.ts`
يحتوي على الثوابت العامة للمشروع:
- `CHART_COLORS`: مصفوفة ألوان بصيغة Hex (`#3b82f6`, `#10b981`, إلخ) تُستخدم حصرياً لرسم المخططات البيانية بانسجام لوني متناسق.

### `lib/types.ts`
يحتوي على واجهات (Interfaces) لنمذجة البيانات المرسلة والمستقبلة من الـ API:
- `User`: لتمثيل المستخدمين والأدوار.
- `Customer`: عملاء النظام (أفراد، شركات، حكومي).
- `Project`: لتمثيل المشروع والعميل والمراحل `payment_stages`.
- `Task`: لتمثيل المهمة المرتبطة بالمشروع والمراحل (Milestone).
- `Milestone`: لتمثيل المراحل الزمنية.
- `TimeLog`: سجلات الوقت للمهام.
- `InternalNote`: الملاحظات الداخلية والردود والمرفقات.
- `InternalPayout`: المدفوعات والمستقطعات.
- `DashboardStats` و `FinancialSummary`: إحصائيات لوحة التحكم الرئيسية.
- `PaginatedResponse<T>` و `ApiResponse<T>`: للبيانات المسترجعة مع صفحات (Pagination) ومعطيات التغليف.
- `MediaItem`: لتمثيل المرفقات للمهام والمشاريع.

### `lib/api.ts`
إعداد الـ Axios instance للتعامل مع الـ Backend:
- **إعداد Token**: باستخدام `localStorage.getItem("token")` في كل طلب (Request Interceptor).
- **إدارة الأخطاء (Error Handling)**: `Response Interceptor` يتعامل مع `401 Unauthorized` ويطرد المستخدم، ويتعامل مع `403 Forbidden` ويعرض تنبيهاً، و `422 Unprocessable Entity` للتحقق من الأخطاء كرسائل للمستخدم. يعالج مشاكل الاتصال كـ `Network Error`.
- **الدوال المتوفرة**:
  - `apiGet<T>(url, config)`: جلب بيانات (GET).
  - `apiPost<T>(url, data, config)`: إضافة بيانات (POST).
  - `apiPut<T>(url, data, config)`: تحديث بيانات (PUT).
  - `apiPatch<T>(url, data, config)`: تحديث جزئي (PATCH).
  - `apiDelete<T>(url, config)`: حذف (DELETE).
- **إرجاع هيكل البيانات**: `extractData(response)` لاستخراج الكائن، `extractPaginatedData(response)` لاستخراج التصفح (Pagination).

### `components/Sidebar.tsx`
مكون القائمة الجانبية للتنقل:
- **حالة الصفحة**: يستخدم `useStore` من `lib/store.ts` لتتبع حالة انهيار أو توسيع القائمة (Collapsed vs Expanded) بناءً على `isSidebarOpen`. يستخدم `usePathname` لمعرفة الرابط النشط.
- **الروابط المتوفرة وصلاحيات RBAC**:
  - يتم استرجاع معلومات المستخدم والدور من `localStorage.getItem("user")`.
  - كل دور له روابط معينة تظهر له:
    - **الجميع**: لوحة التحكم (`/dashboard`)، الإعدادات (`/dashboard/settings`).
    - **فقط الأدمن والمدير (admin/manager)**: العملاء، المشاريع، المهام، سجلات الوقت، الملاحظات الداخلية، حسابات المستقلين.
    - **فقط الأدمن**: الإدارة (المستخدمون، الأنشطة الرقابية).
    - **الموظفون العاديون**: تظهر فقط المشاريع، والمهام.

---

## ثالثاً: صفحات لوحة التحكم `app/(dashboard)/dashboard/*`

### 1. صفحة العملاء (`customers/page.tsx`)
- **المسار (API)**: `GET /customers` و `POST /customers` و `PUT /customers/{id}` و `DELETE /customers/{id}`.
- **البارامترات (Query Params)**: `page`, `per_page`, `search`, `source`, `type`, `sort_by`, `sort_order`.
- **الفلاتر (Filters)**: مربع بحث عن الاسم والهاتف، فلتر بنوع العميل (فرد، شركة)، فلتر بالمصدر. فرز الأعمدة حسب ترتيب زمني أو ابجدي.
- **المكونات (Components)**: `SortableHeader`, `Pagination`, `StatusBadge`, `SkeletonTable`, `SkeletonChart`, `Modal` (لإنشاء وتعديل). Recharts لرسوم الإحصائيات (توزيع العملاء).
- **إدارة الحالة (State Management)**: يخزن بارامترات الـ URL. يستخدم `useState` لحمل قائمة العملاء، التعديل (Edit)، وعرض المودال (CreateOpen)، وفتح القوائم المنبثقة للخيارات (activeMenu).

### 2. صفحة أرشيف العميل (`customers/[id]/page.tsx`)
- **المسار (API)**: `GET /customers/{id}` لتفاصيل العميل. `GET /projects?customer_id={id}` لمشاريع العميل.
- **المكونات**: رسوم بيانية لحالة المشاريع باستخدام Recharts، وقوائم بيانات.

### 3. صفحة المشاريع (`projects/page.tsx`)
- **المسار (API)**: `GET /projects`, `POST /projects`, `PUT /projects/{id}`, `DELETE /projects/{id}`.
- **البارامترات (Query Params)**: `page`, `per_page`, `search`, `status`, `type`, `customer_id`, `sort_by`, `sort_order`.
- **الفلاتر**: فلتر للحالة (قيد التنفيذ، نشط...)، نوع المشروع، وبحث برقم العميل أو الاسم. 
- **المكونات**: `Modal` للمشروع (بموزع متقدم للمميزات ومراحل الدفع)، `SortableHeader`، `Pagination`، `StatusBadge`.
- **إدارة الحالة**: يجلب قائمة موظفين من `/admin/users` وقائمة أنواع مشاريع وعملاء لاختيارهم في النموذج. الـ State يتأثر بالـ URL للرجوع للأمام والخلف بلا فقدان فلتر.

### 4. صفحة المهام (`tasks/page.tsx`)
- **المسار (API)**: `GET /tasks`, `POST /tasks`, `PUT /tasks/{id}`, `DELETE /tasks/{id}`.
- **البارامترات (Query Params)**: `page`, `per_page`, `search`, `status`, `priority`, `billing_type`, `project_id`, `milestone_id`, `assigned_to`, `sort_by`, `sort_order`, `view` (لعرض كانبَن أو جدول).
- **المكونات**: يدعم عرضين (عبر `dnd-kit/core`) الأول للـ Kanban السحب والإفلات، والآخر كجدول. به `Modal` به `TaskForm` دسم. يستخدم مخطط بياني لتتبع المهام بالشهر.
- **إدارة الحالة**: السحب والإفلات يغير الـ Status وينادي الـ API في الخلفية.

### 5. صفحة سجلات الوقت (`time-logs/page.tsx`)
- **المسار (API)**: `GET /time-logs`, `POST /time-logs`, `DELETE /time-logs/{id}`.
- **البارامترات (Query Params)**: `page`, `per_page`, `user_id`, `task_id`, `project_id`, `date_from`, `date_to`, `sort_by`, `sort_order`.
- **الفلاتر**: فلتر لكل شخص، وفلتر مهام معينة ومشاريع معينة، ونطاق زمني شامل.
- **المكونات**: مخططين بيانيين (BAR chart للأيام السابقة، وLINE chart للمقارنة بين المقدّر والفعلي بكل مشروع). ومودال لإضافة الساعات يدوياً.
- **إدارة الحالة**: معالجة معقدة لبيانات المخططات وجلب المشاريع والمهام والأشخاص في الخلفية.

### 6. صفحة المدفوعات والحسابات (`payouts/page.tsx`)
- **المسار (API)**: `GET /internal-payouts`, `POST /internal-payouts`, `DELETE /internal-payouts/{id}`, وملخص شخصي `GET /users/{id}/payout-summary`.
- **البارامترات (Query Params)**: كالسابق، يركز على نوع الكيان (`type` كدفعة أو خصم)، والشخص (`user_id`).
- **المكونات**: يعتمد على `Drawer` الجانبي لعرض مفصل للشخص بدلاً من مودال. يشمل بارات للتقدم ومؤشرات نسب التحويل ومخطط للمستحقات الشهرية.
- **إدارة الحالة**: حالة لـ `Drawer` وحفظ ID الشخص المحدد (`drawerUserId`) وتعبئته بالملخص.

### 7. صفحة إدارة المستخدمين (`admin/users/page.tsx`)
- **المسار (API)**: `GET /admin/users`، `POST /admin/users`، `PUT /admin/users/{id}`, `DELETE /admin/users/{id}`.
- **الفلاتر**: بحث بالاسم والبريد، وترتيب بناءً على وقت الإنشاء.
- **المكونات**: نماذج (Form) بسيطة لإنشاء الموظف مع سعر الساعة الاعتيادي. 

### 8. صفحة الملاحظات الداخلية (`notes/page.tsx`)
- **المسار (API)**: `GET /internal-notes`, `POST /internal-notes`, `DELETE /internal-notes/{id}`، وأيضاً الـ Pin والرد وإضافة مرفقات في مسیرات فرعية.
- **البارامترات (Query Params)**: (Filtered Locally Client Side) عبر معالجة نتائج الـ GET (البحث، المشروع، المهمة، الأهمية، المثبتة).
- **المكونات**: `NoteCard`, و `NoteDrawer` متطور للردود المباشرة (Thread) و المرفقات عبر مكون `MediaUploader`.
- **إدارة الحالة**: يعالج المرفقات والميديا والردود بصيغة محلية ويشمل قفل التركيز (Focus Trap) بداخل الـ Drawer.

### 9. التقرير الشامل للوحة التحكم (`page.tsx` الرئيسية)
- **المسار (API)**: يجلب 4 دوال API معاً `Promise.all`: `GET /dashboard/stats`, `GET /dashboard/financial-summary`, `GET /projects`, `GET /tasks`.
- **المكونات**: نظام بطاقات لعرض الاحصائيات ومخطط مالي ومخطط لحالات المشاريع. 
- **إدارة الحالة**: ينظم البيانات للمسؤولين وغير المسؤولين (لا تظهر بيانات مالية لغير الإدارة).

---

## رابعاً: المكونات المشتركة (Shared Components)

### `components/MediaUploader.tsx`
- **الوظيفة**: مساحة سحب وإفلات (Drag and Drop Zone) لرفع وحذف الملفات.
- **Props**: `modelType` (projects, tasks, internal-notes)، `modelId`, `media` (قائمة الميديا الحالية), و `onMediaChange` للتعامل مع الرفع والحذف.
- **طريقة اللعب**: يستدعي `POST /{modelType}/{modelId}/media` برفع الـ FormData للملفات.

### `components/ProjectMembersPanel.tsx`
- **الوظيفة**: عرض المشاركين في المشروع وصلاحياتهم، وإضافة أوإزالة أعضاء.
- **Props**: `projectId`.
- **طريقة اللعب**: ينادي `GET /projects/{id}/members` و `POST /projects/{id}/members` للتحكم بالأعضاء. يتحقق من قائمة الموظفين (availableUsers) ويستثني الأعضاء المضافين مسبقاً.

### `components/ui/Drawer.tsx`
- **الوظيفة**: نافذة جانبية منزلقة من طرف الشاشة (Off-canvas) لمعاينة سريعة ولعرض التفاصيل (مثال: ملخص مدفوعات شخص).
- **Props**: `open` (boolean), `onClose`, `title`, وكل العناصر الداخلية `children`. يحتوي على Focus Trap للماوس.

### `components/ui/Modal.tsx`
- **الوظيفة**: صندوق حوار وسطي للشاشة (Dialog Box) بمقاسات (sm, md, lg, xl).
- **Props**: `open` (boolean), `onClose`, `title`, `children`, `size`. مزود مستمع زر الإسكيب للهروب والـ Focus Trap.

### `components/ui/Pagination.tsx`
- **الوظيفة**: أزرار تغيير الصفحات واختيار عدد العناصر في الصفحة.
- **Props**: `currentPage`, `lastPage`, `total`, `perPage`, و دوال للنداء كـ `onPageChange`. يوفر واجهة ديناميكية تضبط أرقام الصفحات إذا زادت عن 5.

### `components/ui/SortableHeader.tsx`
- **الوظيفة**: رأس جدول (TH) قابل للضغط مع أيقونات الترتيب التفاعلية حسب الحقل. النماذج Ascendant - Descendant.

### `components/ui/SkeletonTable.tsx`
- **الوظيفة**: واجهات رسومية وهمية للعناصر قيد التحميل (Skeleton Loaders). تشمل دوال `SkeletonTable`, `SkeletonCards`, `SkeletonStatCards`, و `SkeletonChart`.

### `components/ui/StatusBadge.tsx`
- **الوظيفة**: مكوّن رسومي يولد وسم حالة منسق لونياً، يمرر له مفتاح الحالة (مثل `in_progress`) ويستخدم دالة `getStatusBadge` وغيرها من المستلزمات لطباعته.

---

## خامساً: المشاكل أو القرارات التقنية الحالية (Known Issues / Technical Decisions)

1. **التعامل مع الصور والمرفقات (MediaUploader):**
   - قرار تقني: الرفع يتم على الخادم فور اختيار الملف ولا ينتظر الحفظ النهائي للمشروع. 
2. **غياب خاصية البحث من جهة الخادم في صفحة الملاحظات الداخلية:**
   - قرار تقني: فلترة الملاحظات تتم في طرف العميل (Client side filtering) لعدم وجود فلاتر شاملة للبحث والمشروع في `GET /internal-notes` من طرف الخادم حالياً.
3. **مفتاح نوع المشروع `project_type_id`:**
   - تم تعديل الخطأ سابقاً ليكون `type` يتوافق مع الخادم الذي يتوقع Enum قيم كـ (web_development وغيرها) بدلاً من ID.
4. **تعدد أنواع العرض (Views):**
   - تم إعتماد حل لصفحة المهام بوجود `viewMode` في الـ URL لاستعادة وضع الجدول أو Kanban مباشرة دون فقدان الحالة الحالية للمستخدم.

---

## سادساً: أوامر تشغيل المشروع (`package.json`)

يحتوي ملف `package.json` على أوامر التشغيل التالية (Scripts):
- `npm run dev`: تشغيل خادم بيئة التطوير (Next.js Dev Server) لمراقبة التغييرات.
- `npm run build`: بناء النظام تجهيزاً لبيئة التشغيل الإنتاجية (Production).
- `npm run start`: تشغيل الخادم المبني مسبقاً من الـ Build، وهو المستخدم في الإنتاج.
- `npm run lint`: تشغيل مدقق الكود (ESLint) للعثور على أي أخطاء لغوية بالشيفرة.
