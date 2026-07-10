window.GESTORFLOW_CONFIG = {
  checkoutUrl: "https://pay.kiwify.com.br/GDbTNjc"
};

function getCheckoutBaseUrl() {
  const checkoutUrl = window.GESTORFLOW_CONFIG?.checkoutUrl?.trim() || "";

  if (!checkoutUrl) {
    return null;
  }

  try {
    const url = new URL(checkoutUrl);

    if (url.hostname !== "pay.kiwify.com.br") {
      throw new Error("Domínio de checkout não autorizado.");
    }

    return url;
  } catch (error) {
    console.error("URL de checkout inválida:", error);
    return null;
  }
}

function getToolCheckoutUrl() {
  const url = getCheckoutBaseUrl();

  if (!url) {
    return null;
  }

  url.searchParams.set("utm_source", "ferramenta_gratuita");
  url.searchParams.set("utm_medium", "html");
  url.searchParams.set("utm_campaign", "gestorflow_lancamento");

  return url.toString();
}

function getSalesCheckoutUrl() {
  const url = getCheckoutBaseUrl();

  if (!url) {
    return null;
  }

  url.searchParams.set("utm_source", "pagina_vendas");
  url.searchParams.set("utm_medium", "organico");
  url.searchParams.set("utm_campaign", "gestorflow_lancamento");

  return url.toString();
}
