# DivFlow API Documentation

> **Base URL:** `/api`
> **Authentication:** Bearer Token (Laravel Sanctum)
> **Content-Type:** `application/json`

---

## جدول المحتويات

1. [المصادقة (Authentication)](#1-المصادقة-authentication)
2. [إعادة تعيين كلمة المرور (Password Reset)](#2-إعادة-تعيين-كلمة-المرور-password-reset)
3. [المستخدم الحالي (Current User)](#3-المستخدم-الحالي-current-user)
4. [العملاء (Customers)](#4-العملاء-customers)
5. [المشاريع (Projects)](#5-المشاريع-projects)
6. [مرفقات المشاريع (Project Attachments)](#6-مرفقات-المشاريع-project-attachments)
7. [وثائق المشاريع (Project Documents)](#7-وثائق-المشاريع-project-documents)
8. [المهام (Tasks)](#8-المهام-tasks)
9. [مرفقات المهام (Task Attachments)](#9-مرفقات-المهام-task-attachments)
10. [التسليمات (Deliverables)](#10-التسليمات-deliverables)
11. [الملاحظات الداخلية (Internal Notes)](#11-الملاحظات-الداخلية-internal-notes)
12. [مرفقات الملاحظات (Note Attachments)](#12-مرفقات-الملاحظات-note-attachments)
13. [سجل الوقت (Time Logs)](#13-سجل-الوقت-time-logs)
14. [المدفوعات الداخلية (Internal Payouts)](#14-المدفوعات-الداخلية-internal-payouts)
15. [لوحة الإدارة (Admin Panel)](#15-لوحة-الإدارة-admin-panel)

---

## 1. المصادقة (Authentication)

### `POST /api/login` — تسجيل الدخول

> 🔓 لا يتطلب مصادقة

**Request Body:**
```json
{
  "email": "user@example.com",  // مطلوب | بريد إلكتروني صالح
  "password": "secret123"       // مطلوب
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "1|abc123...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "أحمد",
    "email": "user@example.com",
    "roles": ["admin"]
  }
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 401 | `Invalid credentials` |
| 403 | `User account is inactive.` |

---

### `POST /api/logout` — تسجيل الخروج

> 🔒 يتطلب `Bearer Token`

**Request:** بدون body

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 2. إعادة تعيين كلمة المرور (Password Reset)

### `POST /api/forgot-password` — إرسال رمز التحقق OTP

> 🔓 لا يتطلب مصادقة

**Request Body:**
```json
{
  "email": "user@example.com"  // مطلوب | يجب أن يكون موجوداً في جدول users
}
```

**Response (200):**
```json
{
  "message": "تم إرسال رمز التحقق إلى بريدك الإلكتروني."
}
```

---

### `POST /api/verify-otp` — التحقق من رمز OTP

> 🔓 لا يتطلب مصادقة

**Request Body:**
```json
{
  "email": "user@example.com",  // مطلوب | بريد إلكتروني
  "otp": "123456"               // مطلوب | نص | 6 أحرف بالضبط
}
```

**Response (200):**
```json
{
  "message": "تم التحقق من الرمز بنجاح.",
  "verified": true
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 422 | `رمز التحقق غير صالح أو منتهي الصلاحية.` |
| 422 | `انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.` |
| 422 | `رمز التحقق غير صحيح.` |

---

### `POST /api/reset-password` — إعادة تعيين كلمة المرور

> 🔓 لا يتطلب مصادقة

**Request Body:**
```json
{
  "email": "user@example.com",    // مطلوب | يجب أن يكون موجوداً في users
  "otp": "123456",                // مطلوب | نص | 6 أحرف
  "password": "newpassword123",   // مطلوب | 8 أحرف على الأقل
  "password_confirmation": "newpassword123"  // مطلوب | مطابق لكلمة المرور
}
```

**Response (200):**
```json
{
  "message": "تم تغيير كلمة المرور بنجاح!",
  "access_token": "2|xyz789...",
  "user": { /* بيانات المستخدم كاملة */ }
}
```

---

## 3. المستخدم الحالي (Current User)

### `GET /api/user` — جلب بيانات المستخدم الحالي

> 🔒 يتطلب `Bearer Token`

**Response (200):**
```json
{
  "id": 1,
  "name": "أحمد",
  "email": "user@example.com",
  "roles": [
    { "id": 1, "name": "admin", "guard_name": "web" }
  ]
}
```

---

## 4. العملاء (Customers)

### `GET /api/customers` — قائمة العملاء (مع البحث والتصفية)

> 🔒 يتطلب `Bearer Token`

**Query Parameters:**
| المعامل | النوع | الوصف |
|---------|-------|-------|
| `search` | string | بحث في الاسم، الهاتف، الشركة |
| `source` | string | تصفية حسب المصدر |
| `type` | string | تصفية حسب النوع |
| `page` | integer | رقم الصفحة (15 عنصر لكل صفحة) |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "أحمد محمد",
      "phone": "0501234567",
      "company": "شركة التقنية",
      "source": "referral",
      "source_label": "إحالة",
      "type": "individual",
      "type_label": "فرد",
      "creator": {
        "id": 1,
        "name": "المدير",
        "email": "admin@example.com"
      },
      "created_at": "2026-03-15T10:00:00.000000Z"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "last_page": 3, "per_page": 15, "total": 42 }
}
```

---

### `POST /api/customers` — إنشاء عميل جديد

> 🔒 يتطلب `Bearer Token`

**Request Body:**
```json
{
  "name": "أحمد محمد",        // مطلوب | نص | أقصى 255
  "phone": "0501234567",      // اختياري | نص | أقصى 20
  "company": "شركة التقنية",   // اختياري | نص | أقصى 255
  "source": "referral",       // اختياري | من قيم CustomerSource enum
  "type": "individual"        // اختياري | من قيم CustomerType enum
}
```

**Response (200):** كائن `CustomerResource` واحد (نفس صيغة العنصر في القائمة)

---

### `GET /api/customers/{customer}` — عرض عميل محدد

> 🔒 يتطلب `Bearer Token`

**Response (200):** كائن `CustomerResource` واحد

---

### `PUT /api/customers/{customer}` — تحديث عميل

> 🔒 يتطلب `Bearer Token`

**Request Body:** نفس حقول الإنشاء

**Response (200):** كائن `CustomerResource` محدّث

---

### `DELETE /api/customers/{customer}` — حذف عميل

> 🔒 يتطلب `Bearer Token`

**Response (200):**
```json
{
  "message": "Customer deleted successfully."
}
```

---

### `GET /api/customers/sources` — قائمة مصادر العملاء

> 🔒 يتطلب `Bearer Token`

**Response (200):**
```json
[
  { "value": "referral", "label": "إحالة" },
  { "value": "social_media", "label": "وسائل التواصل" }
]
```

---

### `GET /api/customers/types` — قائمة أنواع العملاء

> 🔒 يتطلب `Bearer Token`

**Response (200):**
```json
[
  { "value": "individual", "label": "فرد" },
  { "value": "company", "label": "شركة" }
]
```

---

## 5. المشاريع (Projects)

### `GET /api/projects` — قائمة المشاريع

> 🔒 يتطلب `Bearer Token` | يتم عرض المشاريع حسب صلاحيات المستخدم

**Query Parameters:**
| المعامل | النوع | الوصف |
|---------|-------|-------|
| `search` | string | بحث في اسم المشروع |
| `type` | string | تصفية حسب نوع المشروع |
| `status` | string | تصفية حسب الحالة (`active`, `completed`, `on_hold`) |
| `customer_id` | integer | تصفية حسب العميل |
| `page` | integer | رقم الصفحة (15 عنصر لكل صفحة) |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "project_name": "مشروع الموقع الإلكتروني",
      "type": "web_development",
      "type_label": "تطوير ويب",
      "description": "وصف المشروع",
      "features": "الميزات المطلوبة",
      "status": "active",
      "status_label": "نشط",
      "internal_budget": 5000.00,
      "total_cost": 10000.00,
      "payment_stages": [ /* مراحل الدفع */ ],
      "requirements_study": {
        "team_size": 3,
        "expected_time": "3 أشهر",
        "estimated_expenses": 2000.00
      },
      "start_date": "2026-01-01",
      "end_date": "2026-06-01",
      "owner": { "id": 1, "name": "المدير", "email": "..." },
      "customer": { "id": 1, "name": "أحمد", ... },
      "milestones_count": 3,
      "tasks_count": 12,
      "study_attachment": "https://...",
      "contract_attachment": "https://...",
      "attachments": [
        {
          "id": 1,
          "name": "file",
          "file_name": "document.pdf",
          "mime_type": "application/pdf",
          "size": "2.5 MB",
          "url": "https://..."
        }
      ],
      "created_at": "2026-01-01T00:00:00.000000Z"
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

### `POST /api/projects` — إنشاء مشروع جديد

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `create project`

**Request Body:**
```json
{
  "project_name": "مشروع جديد",              // مطلوب | نص | أقصى 200
  "type": "web_development",                  // اختياري | من قيم ProjectType enum
  "description": "وصف المشروع",               // اختياري | نص
  "features": "الميزات",                       // اختياري | نص
  "internal_budget": 5000,                     // اختياري | رقم | أقل قيمة 0
  "total_cost": 10000,                         // اختياري | رقم | أقل قيمة 0
  "start_date": "2026-01-01",                  // اختياري | تاريخ
  "end_date": "2026-06-01",                    // اختياري | تاريخ | بعد أو يساوي start_date
  "status": "active",                          // اختياري | active, completed, on_hold
  "owner_id": 1,                               // اختياري | معرف مستخدم موجود
  "customer_id": 1,                            // اختياري | معرف عميل موجود
  "payment_stages": [                          // اختياري | مصفوفة
    { "name": "مرحلة 1", "amount": 5000 }
  ],
  "requirements_study": {                      // اختياري | كائن
    "team_size": 3,                            // اختياري | عدد صحيح | أقل قيمة 1
    "expected_time": "3 أشهر",                 // اختياري | نص
    "estimated_expenses": 2000                 // اختياري | رقم | أقل قيمة 0
  }
}
```

**Response (200):** كائن `ProjectResource` واحد

---

### `GET /api/projects/{project}` — عرض مشروع محدد

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `view project`

**Response (200):** كائن `ProjectResource` كامل مع `owner`, `milestones`, `tasks`

---

### `PUT /api/projects/{project}` — تحديث مشروع

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update project`

**Request Body:** نفس حقول الإنشاء (جميعها اختيارية عند التحديث)

**Response (200):** كائن `ProjectResource` محدّث

---

### `DELETE /api/projects/{project}` — حذف مشروع

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `delete project`

**Response (200):**
```json
{
  "message": "Project deleted successfully."
}
```

---

### `GET /api/projects/types` — قائمة أنواع المشاريع

> 🔒 يتطلب `Bearer Token`

**Response (200):**
```json
[
  { "value": "web_development", "label": "تطوير ويب" },
  { "value": "mobile_app", "label": "تطبيق جوال" }
]
```

---

### `GET /api/projects/{project}/tasks` — مهام مشروع محدد

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `view project`

**Response (200):** قائمة `TaskResource` مع pagination (15 لكل صفحة)

---

### `GET /api/projects/{project}/users` — المستخدمون المعينون لمهام المشروع

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `view project`

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "أحمد",
      "email": "ahmed@example.com",
      "employee_number": "EMP001",
      "phone": "0501234567",
      "is_active": true,
      "roles": ["developer"],
      "created_at": "..."
    }
  ]
}
```

---

## 6. مرفقات المشاريع (Project Attachments)

### `POST /api/projects/{project}/attachments` — رفع مرفق للمشروع

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update project`

**Request:** `multipart/form-data`
| الحقل | النوع | الوصف |
|-------|-------|-------|
| `file` | file | مطلوب \| أقصى حجم 10MB |

**Response (200):**
```json
{
  "message": "File uploaded successfully.",
  "attachment": {
    "id": 1,
    "name": "document",
    "file_name": "document.pdf",
    "mime_type": "application/pdf",
    "size": "2.5 MB",
    "url": "https://..."
  }
}
```

---

### `DELETE /api/projects/{project}/attachments/{media}` — حذف مرفق

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update project`

**Response (200):**
```json
{
  "message": "Attachment deleted successfully."
}
```

---

## 7. وثائق المشاريع (Project Documents)

### `POST /api/projects/{project}/study` — رفع ملف الدراسة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update project`

**Request:** `multipart/form-data`
| الحقل | النوع | الوصف |
|-------|-------|-------|
| `file` | file | مطلوب \| أقصى حجم 10MB |

**Response (200):**
```json
{
  "message": "Study attachment uploaded successfully.",
  "url": "https://..."
}
```

---

### `POST /api/projects/{project}/contract` — رفع ملف العقد

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update project`

**Request:** `multipart/form-data`
| الحقل | النوع | الوصف |
|-------|-------|-------|
| `file` | file | مطلوب \| أقصى حجم 10MB |

**Response (200):**
```json
{
  "message": "Contract attachment uploaded successfully.",
  "url": "https://..."
}
```

---

### `DELETE /api/projects/{project}/documents/{collection}` — حذف وثيقة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update project`

**URL Parameters:**
| المعامل | القيم المتاحة |
|---------|-------------|
| `collection` | `study_attachment`, `contract_attachment` |

**Response (200):**
```json
{
  "message": "Document deleted successfully."
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 400 | `Invalid collection.` |

---

## 8. المهام (Tasks)

### `GET /api/tasks` — قائمة جميع المهام

> 🔒 يتطلب `Bearer Token` | الأدمن يرى الكل، باقي المستخدمين يرون المهام المعينة لهم فقط

**Response (200):** قائمة `TaskResource` مع pagination (15 لكل صفحة)

---

### `POST /api/tasks` — إنشاء مهمة جديدة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `create task`

**Request Body:**
```json
{
  "project_id": 1,                // مطلوب | معرف مشروع موجود
  "milestone_id": 1,              // اختياري | معرف مرحلة موجودة
  "parent_task_id": null,          // اختياري | معرف مهمة أب موجودة
  "title": "تصميم الواجهة",        // مطلوب | نص | أقصى 255
  "description": "وصف المهمة",     // اختياري | نص
  "priority": "high",             // اختياري | low, medium, high
  "status": "pending",            // اختياري | pending, in_progress, completed
  "estimated_hours": 8,           // اختياري | رقم | أقل قيمة 0
  "task_weight": 50,              // اختياري | عدد صحيح | بين 1 و 100
  "billing_type": "fixed",        // اختياري | fixed, hourly, non-billable
  "internal_price": 500,          // اختياري | رقم | أقل قيمة 0
  "assigned_users": [2, 3],       // اختياري | مصفوفة معرفات مستخدمين
  "initial_note": "ملاحظة أولية"  // اختياري | نص
}
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "title": "تصميم الواجهة",
    "description": "وصف المهمة",
    "priority": "high",
    "priority_label": "عالي",
    "status": "pending",
    "status_label": "قيد الانتظار",
    "estimated_hours": 8,
    "internal_price": 500,
    "sort_order": null,
    "completed_at": null,
    "is_on_time": null,
    "is_deductible_if_late": null,
    "created_by": 1,
    "creator": { "id": 1, "name": "المدير", ... },
    "dependent_task_id": null,
    "dependent_task": null,
    "assigned_users": [
      { "id": 2, "name": "محمد", ... },
      { "id": 3, "name": "سارة", ... }
    ],
    "parent_task_id": null,
    "attachments": [],
    "deliverables": [],
    "created_at": "2026-03-15T10:00:00.000000Z"
  }
}
```

---

### `GET /api/tasks/{task}` — عرض مهمة محددة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `view task`

**Response (200):** كائن `TaskResource` كامل مع `project`, `milestone`, `users`, `subTasks`, `notes`

---

### `PUT /api/tasks/{task}` — تحديث مهمة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update task`

**Request Body:**
```json
{
  "milestone_id": 1,              // اختياري
  "parent_task_id": null,          // اختياري
  "title": "عنوان محدث",           // اختياري | نص | أقصى 255
  "description": "وصف محدث",       // اختياري
  "priority": "medium",           // اختياري | low, medium, high
  "status": "in_progress",        // اختياري | pending, in_progress, completed
  "estimated_hours": 12,          // اختياري | رقم | أقل قيمة 0
  "task_weight": 75,              // اختياري | عدد صحيح | بين 1 و 100
  "billing_type": "hourly",       // اختياري | fixed, hourly, non-billable
  "internal_price": 800           // اختياري | رقم | أقل قيمة 0
}
```

**Response (200):** كائن `TaskResource` محدّث

---

### `DELETE /api/tasks/{task}` — حذف مهمة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `delete task`

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

### `POST /api/tasks/{task}/assign` — تعيين مستخدم لمهمة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update task`

**Request Body:**
```json
{
  "user_id": 2,                    // مطلوب | معرف مستخدم موجود
  "change_reason": "إعادة توزيع"   // اختياري | نص
}
```

**Response (200):**
```json
{
  "message": "User assigned to task successfully"
}
```

---

## 9. مرفقات المهام (Task Attachments)

### `POST /api/tasks/{task}/attachments` — رفع مرفق للمهمة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update task`

**Request:** `multipart/form-data`
| الحقل | النوع | الوصف |
|-------|-------|-------|
| `file` | file | مطلوب \| أقصى حجم 10MB |

**Response (200):**
```json
{
  "message": "File uploaded successfully.",
  "attachment": {
    "id": 1,
    "name": "design",
    "file_name": "design.png",
    "mime_type": "image/png",
    "size": "1.2 MB",
    "url": "https://..."
  }
}
```

---

### `DELETE /api/tasks/{task}/attachments/{media}` — حذف مرفق مهمة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update task`

**Response (200):**
```json
{
  "message": "Attachment deleted successfully."
}
```

---

## 10. التسليمات (Deliverables)

### `POST /api/tasks/{task}/deliverables` — رفع تسليم

> 🔒 يتطلب `Bearer Token` | يجب أن يكون المستخدم معيناً للمهمة بحالة `active`

**Request:** `multipart/form-data`
| الحقل | النوع | الوصف |
|-------|-------|-------|
| `file` | file | مطلوب \| أقصى حجم 20MB |

**Response (200):**
```json
{
  "message": "Deliverable uploaded successfully.",
  "deliverable": {
    "id": 1,
    "name": "final_design",
    "file_name": "final_design.psd",
    "mime_type": "application/octet-stream",
    "size": "15.3 MB",
    "url": "https://...",
    "uploaded_by": "أحمد"
  }
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 403 | `You are not actively assigned to this task.` |

---

### `DELETE /api/tasks/{task}/deliverables/{media}` — حذف تسليم

> 🔒 يتطلب `Bearer Token` | يمكن للمرفِق أو الأدمن فقط الحذف

**Response (200):**
```json
{
  "message": "Deliverable deleted successfully."
}
```

---

## 11. الملاحظات الداخلية (Internal Notes)

### `GET /api/internal-notes` — قائمة جميع الملاحظات

> 🔒 يتطلب `Bearer Token` | الأدمن يرى الكل، باقي المستخدمين يرون الملاحظات المتعلقة بهم

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "ملاحظة مهمة",
      "content": "محتوى الملاحظة",
      "importance_level": "high",
      "is_pinned": false,
      "parent_id": null,
      "replies": [],
      "creator": { "id": 1, "name": "أحمد", ... },
      "project_id": 1,
      "task_id": 3,
      "mentions": [
        { "id": 2, "name": "محمد", ... }
      ],
      "attachments": [
        {
          "id": 1,
          "name": "file",
          "file_name": "notes.pdf",
          "mime_type": "application/pdf",
          "size": "500 KB",
          "url": "https://..."
        }
      ],
      "created_at": "2026-03-15T10:00:00.000000Z"
    }
  ]
}
```

---

### `POST /api/internal-notes` — إنشاء ملاحظة جديدة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `create internal note`

**Request Body:**
```json
{
  "title": "عنوان الملاحظة",           // اختياري | نص | أقصى 255
  "content": "محتوى الملاحظة",          // مطلوب | نص
  "importance_level": "high",          // اختياري | low, normal, high, critical
  "project_id": 1,                     // اختياري | معرف مشروع موجود
  "task_id": 3,                        // اختياري | معرف مهمة موجودة
  "parent_id": null,                   // اختياري | معرف ملاحظة أب (للردود)
  "is_pinned": false,                  // اختياري | منطقي
  "mentions": [2, 3]                   // اختياري | مصفوفة معرفات مستخدمين
}
```

**Response (200):** كائن `InternalNoteResource` واحد

---

### `GET /api/internal-notes/{internal_note}` — عرض ملاحظة محددة

> 🔒 يتطلب `Bearer Token`

**Response (200):** كائن `InternalNoteResource` واحد مع `creator` و `mentions`

---

### `PUT /api/internal-notes/{internal_note}` — تحديث ملاحظة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update internal note`

**Request Body:** نفس حقول الإنشاء

**Response (200):** كائن `InternalNoteResource` محدّث

---

### `DELETE /api/internal-notes/{internal_note}` — حذف ملاحظة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `delete internal note`

**Response (200):**
```json
{
  "message": "Note deleted successfully"
}
```

---

### `POST /api/internal-notes/{internal_note}/pin` — تثبيت/إلغاء تثبيت ملاحظة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update internal note`

**Request:** بدون body

**Response (200):**
```json
{
  "message": "Note pinned",     // أو "Note unpinned"
  "is_pinned": true              // أو false
}
```

---

### `POST /api/internal-notes/{internal_note}/read` — تعليم الملاحظة كمقروءة

> 🔒 يتطلب `Bearer Token`

**Request:** بدون body

**Response (200):**
```json
{
  "message": "Note marked as read"
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 404 | `Not mentioned in this note` |

---

### `GET /api/tasks/{task}/internal-notes` — ملاحظات مهمة محددة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `view task`

**Response (200):** قائمة `InternalNoteResource` مع `replies`

---

## 12. مرفقات الملاحظات (Note Attachments)

### `POST /api/notes/{note}/attachments` — رفع مرفق لملاحظة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update internal note`

**Request:** `multipart/form-data`
| الحقل | النوع | الوصف |
|-------|-------|-------|
| `file` | file | مطلوب \| أقصى حجم 10MB |

**Response (200):**
```json
{
  "message": "File uploaded successfully.",
  "attachment": {
    "id": 1,
    "name": "file",
    "file_name": "notes.pdf",
    "mime_type": "application/pdf",
    "size": "500 KB",
    "url": "https://..."
  }
}
```

---

### `DELETE /api/notes/{note}/attachments/{media}` — حذف مرفق ملاحظة

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update internal note`

**Response (200):**
```json
{
  "message": "Attachment deleted successfully."
}
```

---

## 13. سجل الوقت (Time Logs)

### `GET /api/time-logs` — قائمة سجلات الوقت

> 🔒 يتطلب `Bearer Token` | الأدمن ومدير المشاريع يرون الكل، الآخرون يرون سجلاتهم فقط

**Query Parameters:**
| المعامل | النوع | الوصف |
|---------|-------|-------|
| `task_id` | integer | تصفية حسب المهمة |
| `user_id` | integer | تصفية حسب المستخدم (للأدمن ومدير المشاريع فقط) |
| `page` | integer | رقم الصفحة (20 عنصر لكل صفحة) |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "task_id": 3,
      "task_title": "تصميم الواجهة",
      "user": { "id": 1, "name": "أحمد", ... },
      "actual_hours": 4.5,
      "work_date": "2026-03-15",
      "comment": "إنهاء التصميم الأولي",
      "created_at": "2026-03-15T10:00:00.000000Z"
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

### `POST /api/time-logs` — إنشاء سجل وقت

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `create time log`

**Request Body:**
```json
{
  "task_id": 3,                  // مطلوب | معرف مهمة موجودة
  "actual_hours": 4.5,           // مطلوب | رقم | بين 0.1 و 24
  "work_date": "2026-03-15",    // مطلوب | تاريخ | لا يتجاوز اليوم
  "comment": "ملاحظة اختيارية"   // اختياري | نص | أقصى 1000
}
```

**Response (200):** كائن `TimeLogResource` واحد

---

### `GET /api/time-logs/{time_log}` — عرض سجل وقت محدد

> 🔒 يتطلب `Bearer Token`

**Response (200):** كائن `TimeLogResource` واحد مع `task` و `user`

---

### `PUT /api/time-logs/{time_log}` — تحديث سجل وقت

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `update time log`

**Request Body:** نفس حقول الإنشاء

**Response (200):** كائن `TimeLogResource` محدّث

---

### `DELETE /api/time-logs/{time_log}` — حذف سجل وقت

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `delete time log`

**Response (200):**
```json
{
  "message": "Time log deleted successfully"
}
```

---

## 14. المدفوعات الداخلية (Internal Payouts)

### `GET /api/internal-payouts` — قائمة المدفوعات

> 🔒 يتطلب `Bearer Token` | الأدمن ومدير المشاريع يرون الكل

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "user": { "id": 2, "name": "محمد", ... },
      "task": { "id": 3, "title": "تصميم الواجهة", ... },
      "amount_paid": 500.00,
      "type": "task_payment",
      "type_label": "دفعة مهمة",
      "status": "paid",
      "status_label": "مدفوع",
      "paid_at": "2026-03-15",
      "notes": "دفعة جزئية",
      "created_at": "2026-03-15T10:00:00.000000Z"
    }
  ]
}
```

---

### `POST /api/internal-payouts` — إنشاء سجل دفع

> 🔒 يتطلب `Bearer Token` | يتطلب صلاحية `create internal payout`

**Request Body:**
```json
{
  "user_id": 2,           // مطلوب | معرف مستخدم موجود
  "task_id": 3,           // مطلوب | معرف مهمة موجودة
  "amount_paid": 500,     // مطلوب | رقم | أقل قيمة 0
  "notes": "دفعة جزئية"   // اختياري | نص | أقصى 1000
}
```

**Response (200):** كائن `InternalPayoutResource` واحد

---

### `GET /api/internal-payouts/{internal_payout}` — عرض سجل دفع محدد

> 🔒 يتطلب `Bearer Token`

**Response (200):** كائن `InternalPayoutResource` واحد مع `user` و `task`

---

### `PUT /api/internal-payouts/{internal_payout}` — تحديث سجل دفع

> 🔒 يتطلب `Bearer Token`

**Request Body:** نفس حقول الإنشاء

**Response (200):** كائن `InternalPayoutResource` محدّث

---

### `DELETE /api/internal-payouts/{internal_payout}` — حذف سجل دفع

> 🔒 يتطلب `Bearer Token`

**Response (200):**
```json
{
  "message": "Payout record deleted successfully"
}
```

---

### `GET /api/users/{user}/payout-summary` — ملخص مدفوعات مستخدم

> 🔒 يتطلب `Bearer Token` | المستخدم يرى ملخصه فقط، الأدمن ومدير المشاريع يرون الكل

**Response (200):**
```json
{
  "user": {
    "id": 2,
    "name": "محمد"
  },
  "total_paid": 1500.00,
  "payouts": [
    {
      "id": 1,
      "amount_paid": 500.00,
      "task": { "id": 3, "title": "تصميم الواجهة", ... },
      ...
    }
  ]
}
```

---

## 15. لوحة الإدارة (Admin Panel)

> ⚠️ جميع روابط الأدمن تتطلب `Bearer Token` + دور `admin`
> البادئة: `/api/admin/...`

---

### إدارة المستخدمين (Users)

#### `GET /api/admin/users` — قائمة المستخدمين

**Query Parameters:**
| المعامل | النوع | الوصف |
|---------|-------|-------|
| `search` | string | بحث في الاسم والبريد الإلكتروني |
| `per_page` | integer | عدد العناصر لكل صفحة (افتراضي: 15) |
| `page` | integer | رقم الصفحة |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "أحمد",
      "email": "admin@example.com",
      "employee_number": "EMP001",
      "phone": "0501234567",
      "is_active": true,
      "roles": ["admin"],
      "created_at": "..."
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

#### `POST /api/admin/users` — إنشاء مستخدم جديد

**Request Body:**
```json
{
  "name": "مستخدم جديد",                // مطلوب | نص | أقصى 255
  "email": "new@example.com",           // مطلوب | بريد فريد
  "phone": "0509876543",                // اختياري | نص | أقصى 20 | فريد
  "password": "password123",            // مطلوب | نص | 8 أحرف على الأقل
  "default_hourly_rate": 50,            // اختياري | رقم | أقل قيمة 0
  "roles": ["developer", "designer"]    // اختياري | مصفوفة أسماء أدوار موجودة
}
```

**Response (200):** كائن `UserResource` واحد مع `roles`

---

#### `GET /api/admin/users/{user}` — عرض مستخدم

**Response (200):** كائن `UserResource` واحد مع `roles`

---

#### `PUT /api/admin/users/{user}` — تحديث مستخدم

**Request Body:**
```json
{
  "name": "اسم محدث",                    // اختياري
  "email": "updated@example.com",        // اختياري | فريد (باستثناء المستخدم الحالي)
  "phone": "0509876543",                 // اختياري | فريد
  "password": "newpassword",             // اختياري | 8 أحرف على الأقل
  "default_hourly_rate": 75,             // اختياري
  "is_active": true,                     // اختياري | منطقي
  "roles": ["admin"]                     // اختياري
}
```

**Response (200):** كائن `UserResource` محدّث

---

#### `DELETE /api/admin/users/{user}` — حذف مستخدم

> ⚠️ لا يمكنك حذف نفسك

**Response (200):**
```json
{
  "message": "User deleted successfully."
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 403 | `You cannot delete yourself.` |

---

#### `PATCH /api/admin/users/{user}/toggle-status` — تفعيل/تعطيل مستخدم

> ⚠️ لا يمكنك تعطيل نفسك

**Request:** بدون body

**Response (200):**
```json
{
  "message": "User status updated successfully.",
  "is_active": false
}
```

---

### إدارة الأدوار (Roles)

#### `GET /api/admin/roles` — قائمة الأدوار

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "admin",
      "permissions": [
        { "id": 1, "name": "create project" },
        { "id": 2, "name": "view tasks" }
      ],
      "created_at": "..."
    }
  ]
}
```

---

#### `POST /api/admin/roles` — إنشاء دور جديد

**Request Body:**
```json
{
  "name": "مدير محتوى",                     // مطلوب | نص | فريد | أقصى 255
  "permissions": ["create project", "view tasks"]  // اختياري | مصفوفة أسماء صلاحيات
}
```

**Response (200):** كائن `RoleResource` واحد مع `permissions`

---

#### `GET /api/admin/roles/{role}` — عرض دور

**Response (200):** كائن `RoleResource` واحد مع `permissions`

---

#### `PUT /api/admin/roles/{role}` — تحديث دور

> ⚠️ لا يمكن تعديل أدوار النظام الأساسية (`Super Admin`, `Admin`)

**Request Body:**
```json
{
  "name": "اسم محدث",                                // اختياري | فريد
  "permissions": ["create project", "view tasks"]    // اختياري
}
```

**Response (200):** كائن `RoleResource` محدّث

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 403 | `Cannot modify core system roles.` |

---

#### `DELETE /api/admin/roles/{role}` — حذف دور

> ⚠️ لا يمكن حذف أدوار النظام الأساسية

**Response (200):**
```json
{
  "message": "Role deleted successfully."
}
```

---

### الصلاحيات (Permissions)

#### `GET /api/admin/permissions` — قائمة جميع الصلاحيات

**Response (200):**
```json
{
  "data": [
    { "id": 1, "name": "create project" },
    { "id": 2, "name": "view tasks" },
    { "id": 3, "name": "delete tasks" }
  ]
}
```

---

### سجلات التدقيق (Audit Logs)

#### `GET /api/admin/audit-logs` — قائمة سجلات التدقيق

**Query Parameters:**
| المعامل | النوع | الوصف |
|---------|-------|-------|
| `task_id` | integer | تصفية حسب المهمة |
| `changed_by` | integer | تصفية حسب المستخدم الذي أجرى التغيير |
| `change_type` | string | تصفية حسب نوع التغيير |
| `per_page` | integer | عدد العناصر لكل صفحة (افتراضي: 20) |

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "task_id": 3,
      "changed_by": { "id": 1, "name": "أحمد", ... },
      "field_name": "status",
      "old_value": "pending",
      "new_value": "in_progress",
      "change_type": "update",
      "created_at": "2026-03-15T10:00:00.000000Z"
    }
  ],
  "links": { ... },
  "meta": { ... }
}
```

---

#### `GET /api/admin/audit-logs/{auditLog}` — عرض سجل تدقيق محدد

**Response (200):** كائن `AuditLogResource` واحد مع `user` و `task`

---

### لوحة القيادة (Dashboard)

#### `GET /api/admin/dashboard/stats` — إحصائيات عامة

**Response (200):**
```json
{
  "total_projects": 15,
  "total_tasks": 120,
  "active_users": 8,
  "financial_liabilities": 3500.50
}
```

---

#### `GET /api/admin/dashboard/financial-summary` — الملخص المالي

**Response (200):**
```json
{
  "unpaid_users": [
    {
      "user_id": 2,
      "name": "محمد",
      "email": "mohammed@example.com",
      "total_earned": 5000.00,
      "total_paid": 3500.00,
      "current_balance": 1500.00
    }
  ]
}
```

---

### الصيانة (Maintenance)

#### `POST /api/admin/maintenance/run-command` — تنفيذ أمر Artisan

**Request Body:**
```json
{
  "command": "cache:clear",     // مطلوب | نص
  "parameters": {}              // اختياري | كائن
}
```

**الأوامر المسموح بها:**
| الأمر | الوصف |
|-------|-------|
| `migrate` | تشغيل قاعدة البيانات migrations |
| `migrate:rollback` | التراجع عن آخر migration |
| `migrate:fresh` | إعادة بناء قاعدة البيانات |
| `db:seed` | تشغيل seeders |
| `optimize:clear` | مسح جميع الكاش |
| `config:cache` | تخزين الإعدادات مؤقتاً |
| `config:clear` | مسح كاش الإعدادات |
| `route:cache` | تخزين المسارات مؤقتاً |
| `route:clear` | مسح كاش المسارات |
| `view:cache` | تخزين العروض مؤقتاً |
| `view:clear` | مسح كاش العروض |
| `permission:cache-reset` | إعادة تعيين كاش الصلاحيات |
| `cache:clear` | مسح الكاش العام |

**Response (200):**
```json
{
  "message": "Command executed successfully.",
  "exit_code": 0,
  "output": "Cache cleared successfully."
}
```

**Errors:**
| الكود | الرسالة |
|-------|---------|
| 403 | `Command not allowed.` (مع قائمة الأوامر المسموحة) |
| 500 | `Error executing command.` |

---

## ملاحظات عامة

### المصادقة
- جميع الروابط (ما عدا `/login`, `/forgot-password`, `/verify-otp`, `/reset-password`) تتطلب إرسال `Bearer Token` في الـ Header:
  ```
  Authorization: Bearer {access_token}
  ```

### صيغة الأخطاء
- أخطاء التحقق (Validation) تُرجع بكود `422`:
  ```json
  {
    "message": "The given data was invalid.",
    "errors": {
      "field_name": ["رسالة الخطأ"]
    }
  }
  ```

### الترقيم (Pagination)
- الروابط التي تُرجع قوائم تدعم الترقيم عبر `?page=N`
- الاستجابة تحتوي على `links` و `meta` مع معلومات الصفحات
