# Save registrations to a Google Sheet

When someone submits the registration form, their details are appended as a row
in your Google Sheet, and their `.wav` clip is uploaded to a Google Drive folder
("Rap Cipher Clips") with a link in the last column.

No Google Cloud project or service-account keys needed — just a Google Sheet + a
small Apps Script. ~10 minutes, one time.

---

## 1. Create the Sheet
1. Go to <https://sheets.new> (signed in to the Google account you want the data in).
2. Name it e.g. **RAP CIPHER — Registrations**. Leave it empty (headers are added automatically).

## 2. Add the Apps Script
1. In that Sheet: **Extensions → Apps Script**.
2. Delete any code in the editor, then paste the entire contents of
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
3. At the top, change `SHARED_SECRET` from `"CHANGE_ME_TO_A_LONG_RANDOM_STRING"`
   to your own long random string (e.g. mash the keyboard — 30+ characters).
   **Keep a copy** — you'll paste the same value into the app in step 4.
4. Click the **Save** (💾) icon.

## 3. Deploy it as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Set:
   - **Description**: anything (e.g. "rap cipher v1")
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**
4. Click **Deploy**. Approve the permissions when prompted
   (it needs access to Sheets + Drive — that's expected; click *Advanced → Go to
   project (unsafe)* if Google warns, it's your own script).
5. Copy the **Web app URL** (ends in `/exec`).

> Quick check: paste that URL in a browser — you should see
> `{"ok":true,"service":"rap-cipher-registrations"}`.

## 4. Connect the app
Create a file named **`.env.local`** in the project root with:

```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
SHEETS_SHARED_SECRET=the-same-long-random-string-from-step-2
```

Then **restart the dev server** (`npm run dev`) so it picks up the variables.

Submit the form once — a new row should appear in your Sheet, and the clip in the
**Rap Cipher Clips** folder in your Drive. 🎉

## 5. When you deploy to Vercel
Add the same two variables in **Vercel → your project → Settings → Environment
Variables** (`SHEETS_WEBHOOK_URL`, `SHEETS_SHARED_SECRET`), then redeploy.

---

### Notes
- **If you edit `Code.gs` later**, you must redeploy: **Deploy → Manage deployments →**
  edit (✏️) → **Version: New version → Deploy**. (The `/exec` URL stays the same.)
- **No webhook set?** The app falls back to saving submissions locally in a
  `registrations/` folder (dev only) — so the form keeps working before setup.
- **Clip size**: very large clips slow the round-trip. The form already caps uploads
  at 25 MB; most rapped/hummed clips are a few MB.
- **Don't commit `.env.local`** — it's already in `.gitignore`.
