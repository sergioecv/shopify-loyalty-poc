import '@shopify/ui-extensions/preact';
import {render} from "preact";
import { useEffect, useRef } from "preact/hooks";

export default async () => {
  render(<ProfileBlockExtension />, document.body)
}

function ProfileBlockExtension() {
  const i18n = shopify.i18n;

  const {sessionToken} = shopify;
  const modalRef = useRef();

  useEffect(() => {
    async function queryApi() {
      // Request a new (or cached) session token from Shopify
      const token =
        await shopify.sessionToken.get();
      console.log('sessionToken.get()', token);

      const apiResponse =
        await fetchWithToken(token);
      // Use your response
      console.log('API response', apiResponse);
      const apiPostRes = await POSTWithToken(token);
      console.log('API response', apiPostRes);
    }

    function fetchWithToken(token) {
      const result = fetch(
        'https://shopify-loyalty-poc.onrender.com/public/customer-discounts',
        { method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return result;
    }

    function POSTWithToken(token) {
      const result = fetch(
        'https://shopify-loyalty-poc.onrender.com/public/customer-discounts',
        { method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return result;
    }

    queryApi();
  }, [sessionToken]);
  
  useEffect(() => {
    async function proxyHit(username, password) { 
      // https://testing-app-123803528.myshopify.com
      const res = await fetch(`${"https://k5an0a-iz.myshopify.com"}/apps/my-custom-path`, {
        method: "POST",
        redirect: "manual",
        headers: {
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': '*',
          // 'X-Shopify-Access-Token': 'yeecki'
          // "Authorization": `Bearer yeecki`
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      const data = await res.json();
      console.log(data);
    }

    async function endpointGet() { 
      // https://testing-app-123803528.myshopify.com
      const response = await fetch('https://shopify-loyalty-poc.onrender.com/public/customer-discounts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('data', data)
    }

    endpointGet()
    proxyHit('sergiochz10@gmail.com', 'raIdar.23');
  }, [])

  return (
    <>
    <s-section heading="Rewards">
      <s-stack direction="block" gap="base" paddingBlockStart="base">
        <s-grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="large">
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Points</s-text>
            <s-text type="strong">43,000</s-text>
          </s-stack>
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Store credit</s-text>
            <s-text type="strong">
              {i18n.formatCurrency(450, {currency: 'USD'})}
            </s-text>
          </s-stack>
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Referrals</s-text>
            <s-text type="strong">3</s-text>
          </s-stack>
          <s-stack direction="block" gap="small">
            <s-text color="subdued">Referral bonus</s-text>
            <s-text type="strong">600</s-text>
          </s-stack>
        </s-grid>
        <s-stack direction="block" max-inline-size="140">
          <s-button tone="neutral" variant="secondary" command="--show"
                commandFor="buy-reward-modal">
            View rewards
          </s-button>
        </s-stack>
      </s-stack>
    </s-section>
    <s-modal
          id="buy-reward-modal"
          ref={modalRef}
          // heading={"Canjear recompensa"}
        >
          {/* <s-form>
            <s-stack direction="block" gap="large">
              <s-stack direction="block">
                <s-text>
                  Texto
                </s-text>
              </s-stack>
              <s-stack direction="inline" gap="base" justifyContent="end">
                <s-button
                  slot="secondary-actions"
                  variant="secondary"
                >
                  Cancelar
                </s-button>
                <s-button
                  slot="primary-action"
                  type="submit"
                  variant="primary"
                >
                  Canjear
                </s-button>
              </s-stack>
            </s-stack>
          </s-form> */}

          <s-image 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhcMXzhcvLbyphVk6AAeN6jZYQmdTYeiLpxL-A7tlYTefFWMA'
            sizes="(max-width: 30em) 50vw, 100vw"
          >
            </s-image>
          <s-text>Texto</s-text>
        </s-modal>
    </>
  );
}