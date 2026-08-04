const host = "gyanvaniai.online";
const key = "e58f9214b74a49c693a19b88c42ef84a";
const keyLocation = `https://${host}/e58f9214b74a49c693a19b88c42ef84a.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/blog`,
  `https://${host}/services/whatsapp-coexistence`,
  `https://${host}/services/whatsapp-automation`,
  `https://${host}/services/ai-development`,
  `https://${host}/services/ai-agent-development`,
  `https://${host}/services/crm-development`,
  `https://${host}/industries/healthcare-crm`,
  `https://${host}/services/hrms-development`,
  `https://${host}/services/erp-development`,
  `https://${host}/services/web-development`,
  `https://${host}/services/mobile-app-development`,
  `https://${host}/privacy`,
  `https://${host}/terms`
];

async function pingIndexNow() {
  const payload = {
    host,
    key,
    keyLocation,
    urlList
  };

  console.log("🚀 Submitting URLs to IndexNow (Bing, Yahoo, DuckDuckGo, Yandex, Naver)...");

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log("✅ IndexNow submission successful! Status Code:", res.status);
      console.log(`Successfully submitted ${urlList.length} URLs for instant search engine indexing.`);
    } else {
      console.log("⚠️ IndexNow submission returned status:", res.status, await res.text());
    }
  } catch (err) {
    console.error("❌ IndexNow submission error:", err);
  }
}

pingIndexNow();
