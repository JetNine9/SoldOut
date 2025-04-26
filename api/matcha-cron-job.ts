import { checkStock } from '@matcha/matchaStock';

export async function GET(request: Request) {
    try {
    console.log("Running the cron job...");

    const stockResponse = await checkStock() as any;
    const isSoldOut = stockResponse?.isSoldOut;

    return new Response(`${isSoldOut ? "Koyamaen Matcha is sold out " : "Koyamaen is in Stock !!"}`);  

  } catch (error) {

    console.error("Error in cron job:", error);
    return new Response(`Cron Job Error`);  

  }
}
