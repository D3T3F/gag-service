const stockUrl = "https://www.gamersberg.com/api/grow-a-garden/stock";
const webhookUrl =
  "https://discordapp.com/api/webhooks/1426575983594438738/bNh6-kPW5hCieCFuP0TrY53tQ0ayAm3Ay4NJTiWTVbVfVm26e4AET-P-ZA3DSQVObbGp";

const statusUrl =
  "https://discordapp.com/api/webhooks/1426656211150966795/meWuVD_DZLezUarkXfedPcRvLkASf3mX3HTBFpLHg0iOuAKZt9n1-8E6CZadJZWigz4h";

const fruitsToCheck = ["Great Pumpkin", "Crimson Thorn"];

// interface searchResult {
//   success: boolean;
//   message: string;
//   data: { seeds: { [key: string]: string } }[];
// }

export async function searchForStock() {
  const response = await fetch(stockUrl, {
    method: "GET",
    headers: { Referer: "https://www.gamersberg.com/grow-a-garden/stock" },
  });

  const result = await response.json();

  if (!result?.success) {
    await sendWebhook(result?.message ?? "Error trying to fetch stock api.");

    return;
  }

  const seeds = result.data[0].seeds;

  const seedKeys = Object.keys(seeds);

  for (const fruit of fruitsToCheck) {
    if (seedKeys.includes(fruit) && seeds[fruit] !== "0")
      await sendWebhook(`Have ${fruit} in the shop!!! 🥳🥳`);
  }
}

export async function sendWebhook(message, statusService = false) {
  const payload = { content: message };

  return await fetch(statusService ? statusUrl : webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}