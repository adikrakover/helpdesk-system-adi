# 🎫 HelpDesk System - מערכת ניהול פניות שירות

מערכת HelpDesk מלאה לניהול פניות שירות (Ticketing System), המאפשרת תקשורת יעילה בין לקוחות, סוכני תמיכה ומנהלי מערכת. המערכת כוללת ממשק ניהול מתקדם, הרשאות מבוססות תפקידים ועדכונים בזמן אמת.

## 🚀 מה המערכת עושה?
המערכת מרכזת את כל פניות השירות של הארגון במקום אחד ומאפשרת:
* **ניהול פניות:** יצירה, צפייה, עדכון ומחיקה של פניות שירות.
* **מעקב סטטוסים:** ניהול מחזור חיי הפנייה (פתוח/סגור).
* **ניהול עדיפויות:** קביעת רמת דחיפות לכל פנייה (נמוכה, בינונית, דחופה).
* **שיוך סוכנים:** מנהלים יכולים לשייך פניות לסוכנים ספציפיים לטיפול ממוקד.
* **ממשק תגובות:** אפשרות לניהול שיחה בתוך כל פנייה בין הלקוח לסוכן.
* **אבטחה:** אימות משתמשים (Authentication) והרשאות לפי תפקיד (Authorization).

## 👥 תפקידים במערכת (Roles)
המערכת פועלת במודל הרשאות מוקפד:

1. **מנהל (Admin):**
   * צפייה בכל הפניות במערכת.
   * שיוך פניות לסוכנים ושינוי עדיפות פנייה.
   * ניהול משתמשים (הוספת סוכנים חדשים).
   * מחיקת פניות.

2. **סוכן (Agent):**
   * צפייה בפניות ששויכו אליו.
   * עדכון סטטוס הפנייה (פתיחה/סגירה).
   * מענה לפנייה והוספת הערות/תגובות.

3. **לקוח (Customer):**
   * יצירת פניות חדשות.
   * מעקב אחר סטטוס הפניות האישיות שלו בלבד.
   * תקשורת מול הסוכן המטפל.

## 🛠 טכנולוגיות
* **Frontend:** React, TypeScript, Material UI (MUI).
* **Backend:** Node.js (Express).
* **Database:** SQL Server / PostgreSQL.
* **Libraries:** Axios, React Hot Toast, SweetAlert2.

## 📋 הנחיות הרצה

### 1. דרישות קדם
* סביבת Node.js מותקנת.
* מסד נתונים פעיל.

### 2. הגדרת ה-Backend
1. נווט לתיקיית ה-server: `cd server`
2. התקן חבילות: `npm install`
3. הגדר קובץ `.env` עם פרטי מסד הנתונים ומפתח JWT.
4. הרץ את השרת: `npm run dev`

### 3. הגדרת ה-Frontend
1. נווט לתיקיית ה-client: `cd client`
2. התקן חבילות: `npm install`
3. הרץ את האפליקציה: `npm run dev`

---
**נכתב עבור פרויקט סיום קורס פיתוח Full Stack.**