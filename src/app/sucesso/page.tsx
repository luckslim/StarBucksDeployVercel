import { redirect } from "next/navigation";
import { stripe } from "../lib/stripe";
import logo from "../../../assets/logo.svg"
import SuccessOrder from "../success-orders/page";
import Image from "next/image";
interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;
  if (!sessionId) {
    redirect("/");
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details"],
  });
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  const formattedProducts = lineItems.data.map((item) => ({
    description: item.description ?? "Produto sem descrição",
    quantity: item.quantity ?? 0,
    amount_total: item.amount_total ?? 0,
  }));
  return (
    <>
      <SuccessOrder
        name={session.customer_details?.name || "nome não informado"}
        email={session.customer_details?.email || "Email não informado"}
        products = {formattedProducts}
      />
      <div className="flex flex-col gap-10 justify-center items-center">
        <Image src={logo} width={400} height={400} alt="logo"/>
        <h1 className="flex items-center justify-center bg-green-100 text-green-950 h-10 w-70 rounded-lg">
          Compra realizada com sucesso!
        </h1>
        <p>Você será redirecionado a página Order List</p>
      </div>
    </>
  );
}
