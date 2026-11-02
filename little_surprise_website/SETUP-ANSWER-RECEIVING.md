# Enable automatic quiz-answer delivery (free Google Apps Script)

The website now has the nine selected Chudel & Bandar quiz questions and a submission hook. For privacy and safety, answers are sent only after the quiz taker reaches the end of the quiz, and the page tells them their choices will be shared with the person who made the surprise.

## One-time setup

1. Sign into the Google account you will use to deploy the script. Quiz response emails are configured to go to **princekagrawal07@gmail.com**.
2. Open https://script.google.com and create a **New project**.
3. Replace the starter code with the contents of `Code.gs` from this ZIP.
4. Click **Deploy → New deployment**. Select the gear/type menu and choose **Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**, then deploy. Approve the requested Google Sheets and email permissions.
6. Copy the Web app URL ending in `/exec`.
7. Open `index.html` in a text editor. Find `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` and replace the entire placeholder text (keep the quotation marks) with your URL.
8. Save `index.html`, upload the updated `index.html` to your GitHub Pages repository, and wait for the site to update.
9. Test it yourself by opening the published website and completing all nine questions. The first submission creates a Google Sheet; subsequent submissions append to it. Each submission will be emailed to **princekagrawal07@gmail.com** (make sure you own or are authorized to use this address). The Google account deploying the script must authorize email and spreadsheet access.

## Important

- Do **not** send the Apps Script URL to your friend or put it in the visible page text; it belongs in the JavaScript configuration.
- The endpoint URL is still required before responses can be delivered. The ZIP cannot deploy a Google service into your account for you.
- The page informs the quiz taker that their answers are shared with the creator.
- If the script is redeployed as a new deployment, make sure the URL in `index.html` matches the current deployment URL.
