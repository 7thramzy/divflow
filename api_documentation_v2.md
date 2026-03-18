# دليل مبرمج التطبيقات - نظام Divloopz Flow (الإصدار الثاني)

هذا المستند يتضمن التوثيق الكامل والمحدث لجميع العمليات البرمجية (APIs) المتاحة في نظام **Divloopz Flow**. تم تحديث هذا الإصدار ليشمل خدمات لوحة الإدارة، أنظمة المرفقات الجديدة، والتحسينات الأخيرة.

---

## 🏗 النظرة العامة على النظام (System Overview)

نظام **Divloopz Flow** مقسم إلى عدة وحدات رئيسية:
1. **المصادقة (Auth):** تسجيل الدخول وتأمين الوصول.
2. **لوحة الإدارة (Admin):** إدارة المستخدمين، العملاء، الصلاحيات، الرقابة، والصيانة.
3. **المشاريع والمهام (Projects & Tasks):** إدارة دورة حياة العمل مع المرفقات والمستندات.
4. **سجلات الوقت (Time Logs):** تتبع الأداء الزمني للموظفين.
5. **الملاحظات الداخلية (Internal Notes):** تواصل داخلي متطور مع نظام إشارات (Mentions).
6. **المدفوعات (Payouts):** تتبع المستحقات المالية الداخلية.

---

## 🔐 التوثيق والوصول (Authentication)

يعتمد النظام على **Bearer Tokens** (Laravel Sanctum).
يجب إرسال التوكن في جميع الطلبات (باستثناء مسارات تسجيل الدخول واستعادة كلمة المرور):
```http
Authorization: Bearer {YOUR_ACCESS_TOKEN}
Accept: application/json
```

---

## 🌎 مسارات الـ API (API Endpoints)

### 1️⃣ المصادقة واستعادة الوصول (Auth & Password)

| العملية | الرابط | البيانات المطلوبة |
| :--- | :--- | :--- |
| **تسجيل الدخول** | `POST /api/login` | `email`, `password` |
| **تسجيل الخروج** | `POST /api/logout` | (يتطلب توكن) |
| **بيانات المستخدم الحالي** | `GET /api/user` | (تُرجع البيانات مع الأدوار) |
| **طلب OTP (نسيان كلمة المرور)** | `POST /api/forgot-password` | `email` |
| **التحقق من OTP** | `POST /api/verify-otp` | `email`, `otp` |
| **إعادة تعيين كلمة المرور** | `POST /api/reset-password` | `email`, `otp`, `password`, `password_confirmation` |

---

### 2️⃣ لوحة الإدارة (Admin APIs)
*جميع الروابط التالية تبدأ بـ `/api/admin` وتتطلب صلاحية **Admin***.

#### 👤 إدارة المستخدمين والعملاء
- **المستخدمين:** `GET, POST, PUT, DELETE` على `/api/admin/users`
- **تفعيل/إيقاف مستخدم:** `PATCH /api/admin/users/{id}/toggle-status`
- **العملاء (Customers):** `GET, POST, PUT, DELETE` على `/api/admin/customers`
  - *يدعم البحث عبر البراميتر `search` والتصفية عبر `source` أو `type`.*

#### 🔐 الصلاحيات والرقابة
- **الأدوار (Roles):** `GET, POST, PUT, DELETE` على `/api/admin/roles`
- **قائمة الصلاحيات:** `GET /api/admin/permissions`
- **سجلات الرقابة (Audit Logs):** `GET /api/admin/audit-logs` و `GET /api/admin/audit-logs/{id}`

#### 📊 الإحصائيات والصيانة
- **إحصائيات اللوحة:** `GET /api/admin/dashboard/stats`
- **الملخص المالي:** `GET /api/admin/dashboard/financial-summary`
- **أوامر الصيانة:** `POST /api/admin/maintenance/run-command`
  - الـ Body: `{"command": "migrate", "parameters": []}`
  - *الأوامر المسموحة تشمل: `migrate`, `db:seed`, `cache:clear`, وغيرها.*

---

### 3️⃣ المشاريع (Projects)

| العملية | الرابط | ملاحظات |
| :--- | :--- | :--- |
| **عرض المشاريع** | `GET /api/projects` | تدعم التصفح (Pagination) |
| **إنشاء مشروع** | `POST /api/projects` | يتطلب `project_name`, `internal_budget`, إلخ |
| **تفاصيل مشروع** | `GET /api/projects/{id}` | تُرجع تفاصيل المشروع كاملة |
| **تعديل / حذف** | `PUT / DELETE` | على المسار `/api/projects/{id}` |
| **مرفقات عامة** | `POST /api/projects/{id}/attachments` | حقل الملف: `file` |
| **رفع دراسة (Study)** | `POST /api/projects/{id}/study` | حقل الملف: `file` |
| **رفع عقد (Contract)** | `POST /api/projects/{id}/contract` | حقل الملف: `file` |
| **حذف مستند** | `DELETE /api/projects/{id}/documents/{collection}` | الـ `collection` هو `study_attachment` أو `contract_attachment` |
| **مستخدمو مهام المشروع** | `GET /api/projects/{id}/users` | إرجاع جميع الموظفين المسندين لمهام في المشروع |
| **مهام المشروع** | `GET /api/projects/{id}/tasks` | عرض كافة المهام التابعة لمشروع معين |

---

### 4️⃣ المهام (Tasks)

- **العمليات الأساسية (CRUD):** `GET, POST, PUT, DELETE` على `/api/tasks`
- **إسناد مستخدمين:** `POST /api/tasks/{id}/assign`
  - البيانات: `user_id`, `change_reason`
- **مرفقات المهمة:** `POST /api/tasks/{id}/attachments`
- **تسليمات المهمة (Deliverables):** `POST /api/tasks/{id}/deliverables`
- **ملاحظات المهمة:** `GET /api/tasks/{id}/internal-notes`

---

### 5️⃣ الملاحظات وسجلات الوقت

#### 📝 الملاحظات الداخلية (Internal Notes)
- **العمليات:** `GET, POST, PUT, DELETE` على `/api/internal-notes`
- **تثبيت ملاحظة:** `POST /api/internal-notes/{id}/pin`
- **تحديد كمقروءة:** `POST /api/internal-notes/{id}/read`
- **مرفقات الملاحظة:** `POST /api/notes/{id}/attachments`

#### ⏱ سجلات الوقت (Time Logs)
- **العمليات:** `GET, POST, PUT, DELETE` على `/api/time-logs`
  - البيانات المطلوبة عند الإنشاء: `task_id`, `actual_hours`, `work_date`.

---

### 6️⃣ المدفوعات (Internal Payouts)

- **عرض المدفوعات:** `GET /api/internal-payouts`
- **تسجيل دفعة:** `POST /api/internal-payouts`
- **ملخص مستخدم:** `GET /api/users/{id}/payout-summary`
  - يعرض إجمالي المستحقات مقابل ما تم دفعه فعلياً.

---

## 🧩 إرشادات تقنية هامة

1. **التعامل مع الصور والملفات:**
   - جميع عمليات الرفع تستخدم `multipart/form-data` مع مفتاح باسم `file`.
   - الحد الأقصى لحجم الملف هو **10 ميجابايت**.

2. **الأخطاء (Error Responses):**
   - **422:** خطأ في التحقق من البيانات (Validation Error).
   - **401:** المستخدم غير مسجل دخول أو التوكن غير صالح.
   - **403:** المستخدم مسجل دخول ولكن لا يملك صلاحية لهذا الإجراء.

3. **حالة المشروع والمهام:**
   - الحالات المعتمدة للمشاريع والمهام هي: `pending`, `in_progress`, `completed`, `on_hold`.
   - الأولويات: `low`, `medium`, `high`.

---
*هذا المستند مرجع حي، يتم تحديثه مع كل إضافة برمجية جديدة للنظام.*
