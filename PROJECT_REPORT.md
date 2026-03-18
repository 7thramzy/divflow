# تقرير إنجازات مشروع DivFlow

| البند | التفاصيل |
|---|---|
| الشركة | Divloopz Software Agency |
| المشروع | DivFlow ERP — نظام إدارة المشاريع والمهام |
| الفترة | مارس 2026 |
| الإصدار | v3.0 — Production Ready |
| حالة البناء | ✅ Compiled Successfully |

---

## القسم الأول: وصف النظام

نظام **DivFlow** هو الحل التقني المتكامل لإدارة الموارد والمشاريع داخل وكالات البرمجيات. تم تصميمه لمعالجة تشتت البيانات عبر تحويل العمليات اليدوية إلى مسارات عمل رقمية مؤتمتة، مما يضمن دقة التتبع المالي والتقني.

**الوحدات الرئيسية:**
1. **المشاريع (Projects):** تتبع دورة حياة المشروع من الدراسة الفنية حتى الإغلاق.
2. **المهام (Tasks):** إدارة المهام بنظام Kanban والتبعية وتتبع الإنجاز.
3. **العملاء (Customers):** قاعدة بيانات مركزية للعملاء وتصنيف مصادرهم.
4. **الملاحظات (Notes):** نظام تواصل داخلي مع الإشارات (Mentions) والتثبيت.
5. **المدفوعات (Payouts):** إدارة السيولة والالتزامات المالية تجاه الفريق.
6. **الوقت (Time Logs):** مراقبة الإنتاجية عبر سجلات الساعات اليومية.
7. **إدارة المستخدمين (Admin Users):** التحكم الكامل في الصلاحيات والأدوار.

**التقنيات المستخدمة:**
- **Frontend:** Next.js 15+ (App Router), TypeScript, Tailwind CSS v4.
- **Backend:** Laravel 11 / PHP 8.2+.
- **Database:** MySQL 8+ (InnoDB).
- **Caching & Workers:** Redis + Laravel Horizon.
- **Authentication:** Laravel Sanctum (Bearer Token).
- **Packages:** Spatie Permission, Spatie Media Library, Spatie Query Builder.

---

## القسم الثاني: إنجازات Backend — قاعدة البيانات

تم تحديث وهيكلة قاعدة البيانات لدعم ميزات الـ ERP المتقدمة:

| الجدول | الحالة | الأعمدة المضافة / الوصف |
|---|---|---|
| `users` | تعديل | إضافة `employee_number, default_hourly_rate, is_active` |
| `customers` | جديد | `name, phone, company, source, type, created_by` |
| `projects` | تعديل | `type, features, total_cost, payment_stages, requirements_study, customer_id` |
| `project_members` | جديد | ربط متعدد لمتعدد: `project_id, user_id, role, assigned_by` |
| `milestones` | موجود | `project_id, title, is_completed, sort_order` |
| `tasks` | تعديل | `created_by, sort_order, dependent_task_id, completed_at, is_on_time, is_deductible_if_late` |
| `task_assignments` | موجود | تتبع تاريخ الإسناد مع `change_reason` |
| `time_logs` | موجود | `task_id, user_id, actual_hours, work_date, comment` |
| `internal_notes` | تعديل | إضافة `parent_id` للردود المتداخلة، `importance_level` |
| `note_mentions` | موجود | تتبع إشارات المستخدمين في الملاحظات |
| `internal_payouts` | تعديل | `type, status, paid_at, amount_paid, notes` |
| `audit_logs` | إعادة هيكلة | نظام Polymorphic لتتبع التغييرات (Old vs New values) |
| `media` | جديد | دمج Spatie Media Library لإدارة المرفقات |
| `roles / permissions` | تعديل | دعم Scopes و Project-level roles |

**الميزات التقنية للـ Backend:**
- **HasAuditLog Trait:** يتم تسجيل أي تغيير في الحقول الحساسة (مثل حالة المهمة أو الميزانية) تلقائياً في `audit_logs`.
- **Spatie Teams/Scopes:** تمكين المستخدمين من امتلاك أدوار مختلفة بناءً على المشروع (مثلاً: مطور في مشروع A ومدير في مشروع B).
- **Spatie Media Library:** معالجة المرفقات، توليد المصغرات، وضمان أمان الملفات.
- **Project booted():** تعيين المستخدم الحالي كـ `owner_id` تلقائياً عند إنشاء أي مشروع لضمان تكامل البيانات.

---

## القسم الثالث: إنجازات Backend — الـ API

تم تنفيذ **72** نقطة نهاية (Endpoint) موثقة بالكامل:

| # | الوحدة | الطريقة | الرابط | الوصف | المصادقة |
|---|---|---|---|---|---|
| 1 | Auth | POST | `/api/login` | تسجيل الدخول | لا |
| 2 | Auth | POST | `/api/logout` | تسجيل الخروج | Bearer |
| 3 | Auth | GET | `/api/user` | بيانات المستخدم الحالي | Bearer |
| 4 | Password | POST | `/api/forgot-password` | إرسال OTP للبريد | لا |
| 5 | Password | POST | `/api/verify-otp` | التحقق من رمز OTP | لا |
| 6 | Password | POST | `/api/reset-password` | إعادة تعيين كلمة المرور | لا |
| 7 | Customers | GET | `/api/customers` | قائمة العملاء مع Pagination | Bearer |
| 8 | Customers | POST | `/api/customers` | إنشاء عميل جديد | Bearer |
| 9 | Customers | GET | `/api/customers/{id}` | عرض تفاصيل عميل | Bearer |
| 10 | Customers | PUT | `/api/customers/{id}` | تحديث بيانات عميل | Bearer |
| 11 | Customers | DELETE | `/api/customers/{id}` | حذف عميل | Bearer |
| 12 | Customers | GET | `/api/customers/sources` | قائمة مصادر العملاء (Enum) | Bearer |
| 13 | Customers | GET | `/api/customers/types` | قائمة أنواع العملاء (Enum) | Bearer |
| 14 | Projects | GET | `/api/projects` | قائمة المشاريع مع Scopes | Bearer |
| 15 | Projects | POST | `/api/projects` | إنشاء مشروع جديد | Bearer |
| 16 | Projects | GET | `/api/projects/{id}` | عرض تفاصيل المشروع | Bearer |
| 17 | Projects | PUT | `/api/projects/{id}` | تحديث بيانات المشروع | Bearer |
| 18 | Projects | DELETE | `/api/projects/{id}` | حذف مشروع | Bearer |
| 19 | Projects | GET | `/api/projects/types` | أنواع المشاريع | Bearer |
| 20 | Projects | GET | `/api/projects/{id}/tasks` | قائمة مهام المشروع | Bearer |
| 21 | Projects | GET | `/api/projects/{id}/users` | أعضاء فريق المشروع | Bearer |
| 22 | Attachments | POST | `/api/projects/{id}/attachments` | رفع مرفقات عامة | Bearer |
| 23 | Attachments | DELETE | `/api/projects/{id}/attachments/{media}` | حذف مرفق | Bearer |
| 24 | Documents | POST | `/api/projects/{id}/study` | رفع ملف الدراسة الفنية | Bearer |
| 25 | Documents | POST | `/api/projects/{id}/contract` | رفع ملف العقد | Bearer |
| 26 | Documents | DELETE | `/api/projects/{id}/documents/{collection}` | حذف وثيقة رسمية | Bearer |
| 27 | Tasks | GET | `/api/tasks` | قائمة جميع المهام | Bearer |
| 28 | Tasks | POST | `/api/tasks` | إنشاء مهمة جديدة | Bearer |
| 29 | Tasks | GET | `/api/tasks/{id}` | عرض تفاصيل المهمة | Bearer |
| 30 | Tasks | PUT | `/api/tasks/{id}` | تحديث حالة/بيانات المهمة | Bearer |
| 31 | Tasks | DELETE | `/api/tasks/{id}` | حذف مهمة | Bearer |
| 32 | Tasks | POST | `/api/tasks/{id}/assign` | إسناد مستخدم للمهمة | Bearer |
| 33 | Task Files | POST | `/api/tasks/{id}/attachments` | رفع مرفق لمهمة | Bearer |
| 34 | Task Files | DELETE | `/api/tasks/{id}/attachments/{media}` | حذف مرفق مهمة | Bearer |
| 35 | Deliverables | POST | `/api/tasks/{id}/deliverables` | رفع مخرجات العمل | Bearer |
| 36 | Deliverables | DELETE | `/api/tasks/{id}/deliverables/{media}` | حذف مخرج عمل | Bearer |
| 37 | Notes | GET | `/api/internal-notes` | قائمة الملاحظات الداخلية | Bearer |
| 38 | Notes | POST | `/api/internal-notes` | إضافة ملاحظة/رد | Bearer |
| 39 | Notes | GET | `/api/internal-notes/{id}` | عرض ملاحظة | Bearer |
| 40 | Notes | PUT | `/api/internal-notes/{id}` | تحديث محتوى ملاحظة | Bearer |
| 41 | Notes | DELETE | `/api/internal-notes/{id}` | حذف ملاحظة | Bearer |
| 42 | Notes | POST | `/api/internal-notes/{id}/pin` | تثبيت الملاحظة للمشروع | Bearer |
| 43 | Notes | POST | `/api/internal-notes/{id}/read` | تعليم الملاحظة كمقروءة | Bearer |
| 44 | Notes | GET | `/api/tasks/{id}/internal-notes` | ملاحظات مرتبطة بمهمة | Bearer |
| 45 | Note Files | POST | `/api/notes/{id}/attachments` | رفع مرفق لملاحظة | Bearer |
| 46 | Note Files | DELETE | `/api/notes/{id}/attachments/{media}` | حذف مرفق ملاحظة | Bearer |
| 47 | Time Logs | GET | `/api/time-logs` | قائمة سجلات الوقت | Bearer |
| 48 | Time Logs | POST | `/api/time-logs` | تسجيل ساعات عمل | Bearer |
| 49 | Time Logs | GET | `/api/time-logs/{id}` | عرض سجل وقت | Bearer |
| 50 | Time Logs | PUT | `/api/time-logs/{id}` | تعديل ساعات مسجلة | Bearer |
| 51 | Time Logs | DELETE | `/api/time-logs/{id}` | حذف سجل وقت | Bearer |
| 52 | Payouts | GET | `/api/internal-payouts` | قائمة المدفوعات والخصومات | Bearer |
| 53 | Payouts | POST | `/api/internal-payouts` | إنشاء سجل دفع جديد | Bearer |
| 54 | Payouts | GET | `/api/internal-payouts/{id}` | عرض تفاصيل الدفعة | Bearer |
| 55 | Payouts | PUT | `/api/internal-payouts/{id}` | تحديث سجل دفع | Bearer |
| 56 | Payouts | DELETE | `/api/internal-payouts/{id}` | حذف سجل دفع | Bearer |
| 57 | Payouts | GET | `/api/users/{id}/payout-summary` | كشف حساب مالي للمستخدم | Bearer |
| 58 | Admin | GET | `/api/admin/users` | إدارة الفريق (Admin) | Admin |
| 59 | Admin | POST | `/api/admin/users` | إضافة مستخدم للنظام | Admin |
| 60 | Admin | GET | `/api/admin/users/{id}` | ملف الموظف الكامل | Admin |
| 61 | Admin | PUT | `/api/admin/users/{id}` | تحديث بيانات الموظف | Admin |
| 62 | Admin | DELETE | `/api/admin/users/{id}` | حذف مستخدم من النظام | Admin |
| 63 | Admin | PATCH | `/api/admin/users/{id}/toggle-status` | تجميد/تفعيل حساب | Admin |
| 64 | Admin | GET | `/api/admin/roles` | قائمة الأدوار المتاحة | Admin |
| 65 | Admin | POST | `/api/admin/roles` | إنشاء دور جديد | Admin |
| 66 | Admin | PUT | `/api/admin/roles/{id}` | تحديث صلاحيات الدور | Admin |
| 67 | Admin | DELETE | `/api/admin/roles/{id}` | حذف دور | Admin |
| 68 | Admin | GET | `/api/admin/permissions` | قائمة الصلاحيات الخام | Admin |
| 69 | Admin | GET | `/api/admin/audit-logs` | تتبع التغييرات العام | Admin |
| 70 | Admin | GET | `/api/admin/dashboard/stats` | الإحصائيات المركزية | Admin |
| 71 | Admin | GET | `/api/admin/dashboard/financial-summary` | التقارير المالية للشركة | Admin |
| 72 | Admin | POST | `/api/admin/maintenance/run-command` | تنفيذ أوامر الصيانة | Admin |

---

## القسم الرابع: إنجازات Frontend — الصفحات

تم تطوير **16** واجهة مستخدم احترافية تدعم RTL:

| # | الصفحة | المسار | الميزات الرئيسية |
|---|---|---|---|
| 1 | تسجيل الدخول | `/login` | Bearer Token، حماية ضد الدخول غير المصرح |
| 2 | نسيت كلمة المرور | `/forgot-password` | طلب OTP مع Validation حي |
| 3 | التحقق من OTP | `/verify-otp` | 6 حقول إدخال ذكية مع Auto-focus |
| 4 | إعادة التعيين | `/reset-password` | تحديث آمن لكلمة المرور |
| 5 | لوحة التحكم | `/dashboard` | Stat Cards حية، ملخص النشاط الأخير |
| 6 | قائمة المشاريع | `/dashboard/projects` | URL Sync، Table/Card Toggle، تصدير CSV |
| 7 | تفاصيل مشروع | `/dashboard/projects/[id]` | تخطيط 70/30، مؤشرات أداء (Donut Chart) |
| 8 | قائمة المهام | `/dashboard/tasks` | Kanban Board، Drag & Drop، Bar Chart |
| 9 | تفاصيل مهمة | `/dashboard/tasks/[id]` | Timeline للنشاط، Tabs للمرفقات والوقت |
| 10 | قائمة العملاء | `/dashboard/customers` | تحليل مصادر العملاء عبر الرسوم البيانية |
| 11 | تفاصيل عميل | `/dashboard/customers/[id]` | كشف بالمشاريع المرتبطة وإحصائياتها |
| 12 | الملاحظات | `/dashboard/notes` | نظام Threading، Pinned notes، Drawer ذكي |
| 13 | سجلات الوقت | `/dashboard/time-logs` | تحليل الساعات (Bar/Line Charts) |
| 14 | المدفوعات | `/dashboard/payouts` | ملخص مالي، نظام Drawer لعرض التفاصيل |
| 15 | إدارة المستخدمين | `/dashboard/admin/users` | CRUD كامل، إدارة الأدوار (Multi-select) |
| 16 | تفاصيل مستخدم | `/dashboard/admin/users/[id]` | كشف حساب مالي، رسم بياني للإنتاجية |

---

## القسم الخامس: Forms المنجزة

تم بناء النماذج باستخدام أنظمة تحقق (Validation) قوية:

| الـ Form | الحقول الرئيسية | نوع الحقول |
|---|---|---|
| مشروع جديد | Name, Type, Status, Customer, Owner, Budget, Stages, Requirements | Dropdowns حية + JSON Dynamic Forms |
| مهمة جديدة | Project, Milestone, Priority, Status, Billing, Parent, Dependency | Dropdowns متسلسلة (Dependent Selects) |
| إسناد مهمة | User ID, Change Reason | Live search dropdown + Textarea |
| عميل جديد | Name, Phone, Company, Source, Type | Enums-based Dropdowns |
| ملاحظة جديدة | Project, Task, Importance, Pin, Content | Project-Task dependent dropdowns |
| سجل وقت | Task ID, Hours, Date, Comment | Select with searching + Date Picker |
| دفعة مالية | User, Task, Type, Status, Amount, Notes | Unified search select |
| مستخدم جديد | Name, Email, Password, Roles, Active Status | Multi-select badges for roles |

---

## القسم السادس: معايير الجودة المطبّقة

**TypeScript:**
- تطبيق الصرامة البرمجية (Strict Mode) مع **صفر** استخدام لـ `any`.
- توحيد كافة الواجهات البرمجية (Interfaces) في `lib/types.ts`.

**UI/UX:**
- دعم كامل لاتجاه النص من اليمين لليسار (**RTL**) في كافة الواجهات.
- عرض الأرقام والمبالغ بالعملة بتنسيق `<span dir="ltr">` لمنع تداخل الرموز.
- استخدام **Skeleton Loading** لضمان تجربة مستخدم سلسة أثناء جلب البيانات.
- توفير **Empty States** برسوم توضيحية وأزرار Call-to-action لكل القوائم الفارغة.
- تفعيل نظام **Confirm Dialog** لحماية البيانات من الحذف غير المقصود.
- نظام تنبيهات (**Toast Notifications**) تفاعلي للعمليات الناجحة والفاشلة.
- ضمان إمكانية الوصول (**Accessibility**) عبر دعم المفاتيح (Escape to close) و Focus-trap.

**Performance:**
- معالجة البيانات ضخمة الحجم عبر **Server-side Pagination**.
- ربط حالة الفلاتر والبحث بالرابط (**URL Sync**) لمشاركة النتائج بسهولة.
- تطبيق **Optimistic Updates** في لوحة Kanban لسرعة الاستجابة.
- تحسين استعلامات قاعدة البيانات عبر **Eager Loading** لتقليل N+1 problems.

**Security:**
- حماية كافة المسارات عبر **Route Guards** تتطلب Bearer Token صالح.
- نظام **RBAC** صارم يمنع الوصول لصفحات الإدارة لغير المشرفين.
- حماية المستخدم الحالي من تعطيل أو حذف حسابه الخاص برمجياً.

**Design System:**
- توحيد الهوية البصرية عبر **Design Tokens** (Primary: `#FF750F`).
- توحيد منطق الحالات عبر الدالة المركزية `getStatusBadge()` في `lib/utils.ts`.
- توحيد ألوان الرسوم البيانية عبر الثابت `CHART_COLORS` في `lib/constants.ts`.
- تنظيف الكود بالكامل من أي ألوان صلبة (Zero hardcoded hex colors).

---

## القسم السابع: نتائج التحقق النهائي

```text
✅ npm run build         → Compiled Successfully (Exit code 0)
✅ Hardcoded colors      → لا نتائج (نظام نظيف بالكامل)
✅ CHART_COLORS          → مستخدم في 12 موقعاً برمجياً
✅ getStatusBadge        → مستخدم في كافة جداول وكروت الحالات
✅ TypeScript            → tsc --noEmit (Success - No errors)
✅ Admin Users page      → موجودة وتعمل للصلاحيات المسموحة
✅ Admin Users [id] page → موجودة وتعرض التفاصيل المالية بدقة
✅ Sidebar Admin link    → يظهر ديناميكياً بناءً على دور المستخدم
```

---

## القسم الثامن: هيكل المشروع النهائي

```text
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── forgot-password/page.tsx
│   ├── verify-otp/page.tsx
│   └── reset-password/page.tsx
├── (dashboard)/
│   └── dashboard/
│       ├── page.tsx (Overview)
│       ├── projects/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── tasks/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── customers/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── notes/page.tsx
│       ├── time-logs/page.tsx
│       ├── payouts/page.tsx
│       └── admin/
│           └── users/
│               ├── page.tsx
│               └── [id]/page.tsx
components/
├── ui/ (Button, Modal, Drawer, Skeleton, etc.)
├── forms/ (ProjectForm, TaskForm, etc.)
├── charts/ (BarChart, DonutChart, etc.)
├── Sidebar.tsx
└── Header.tsx
lib/
├── api.ts (Axios configurations)
├── constants.ts (Enums & Chart colors)
├── utils.ts (Formatting & UI Logic)
└── types.ts (TypeScript Definitions)
```

---

## القسم التاسع: مقترحات المرحلة القادمة

| # | المقترح | الأولوية | الوصف |
|---|---|---|---|
| 1 | إشعارات Real-time | عالية | استخدام WebSockets لتنبيه الموظفين عند المنشن أو الإسناد |
| 2 | تصدير PDF | عالية | توليد فواتير وتقارير مالية رسمية بصيغة PDF |
| 3 | Dashboard Analytics | متوسطة | تحليلات متقدمة لربحية المشاريع وأداء الموظفين شهرياً |
| 4 | تطبيق جوال (Native) | متوسطة | بناء تطبيق React Native لاستقبال الإشعارات وتسجيل الوقت |
| 5 | التوقيت التلقائي (Timer) | منخفضة | إضافة زر Play/Stop داخل المهمة لحساب الوقت بدقة |
| 6 | المصادقة البيومترية | منخفضة | دعم FaceID/Fingerprint لتسجيل الدخول السريع |

---

**الخاتمة:**

```text
───────────────────────────────────────────
تم الإنجاز بواسطة فريق Divloopz Software Agency
مارس 2026 — DivFlow ERP v3.0
Production Ready ✅
───────────────────────────────────────────
```
