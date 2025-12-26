import '@shopify/ui-extensions/preact';
import {render} from "preact";
import { useEffect, useRef } from "preact/hooks";
import ProfileHeader from './ProfileHeader';

const pointsIcon = 'https://cdn.shopify.com/s/files/1/0939/7413/5068/files/Group_1187.svg?v=1762213297';
const completedCheckIcon = 'https://cdn.shopify.com/s/files/1/0939/7413/5068/files/Group_1184.svg?v=1762215414';
const showMoreArrowIcon = 'https://cdn.shopify.com/s/files/1/0939/7413/5068/files/Group_1287.svg?v=1762215408';
const gamesStreakDummy: StreakItemProps[] = [
  {
    name: 'J2: Tigres vs FC Juarez', 
    date: 'Sáb. 19 Jul', 
    completed: true
  },
  {
    name: 'J2: Tigres vs FC Juarez', 
    date: 'Sáb. 19 Jul', 
    completed: true
  },
  {
    name: 'J2: Tigres vs FC Juarez', 
    date: 'Sáb. 19 Jul', 
    completed: false
  }
]

const matchLinksDummy: MatchLinkCardProps[] = [
  {
    image: 'https://imgs.search.brave.com/2BO9iHdmg7lxbsPc7WxTRrGEJyHuPF_pN7DA4MqPCfM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzIvdGlncmVz/LXVhbmwtbG9nby1w/bmdfc2Vla2xvZ28t/NTA3NzUyLnBuZw',
    awayImg: 'https://images.seeklogo.com/logo-png/9/2/necaxa-logo-png_seeklogo-97904.png', 
    name: 'Jornada 13: Tigres vs Necaxa',
    date: 'Vier. 17 de Octubre',
    link: 'https://boletomovil.com/evento/j-17-tigres-vs-san-luis-2025-11-08?utm_campaign=populares_web_bm&utm_medium=sitio_bm&utm_source=popular1_bm'
  },
  {
    image: 'https://imgs.search.brave.com/2BO9iHdmg7lxbsPc7WxTRrGEJyHuPF_pN7DA4MqPCfM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzIvdGlncmVz/LXVhbmwtbG9nby1w/bmdfc2Vla2xvZ28t/NTA3NzUyLnBuZw',
    awayImg: 'https://spng.pngfind.com/pngs/s/414-4142028_club-tijuana-logo-ohio-wesleyan-soccer-logo-hd.png',
    name: 'Jornada 15: Tigres vs Tijuana',
    date: 'Vier. 17 de Octubre',
    link: 'https://boletomovil.com/evento/j-17-tigres-vs-san-luis-2025-11-08?utm_campaign=populares_web_bm&utm_medium=sitio_bm&utm_source=popular1_bm'
  },
  {
    image: 'https://imgs.search.brave.com/2BO9iHdmg7lxbsPc7WxTRrGEJyHuPF_pN7DA4MqPCfM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzIvdGlncmVz/LXVhbmwtbG9nby1w/bmdfc2Vla2xvZ28t/NTA3NzUyLnBuZw',
    awayImg: 'https://spng.pngfind.com/pngs/s/414-4142028_club-tijuana-logo-ohio-wesleyan-soccer-logo-hd.png',
    name: 'Jornada 15: Tigres vs Tijuana',
    date: 'Vier. 17 de Octubre',
    link: 'https://boletomovil.com/evento/j-17-tigres-vs-san-luis-2025-11-08?utm_campaign=populares_web_bm&utm_medium=sitio_bm&utm_source=popular1_bm'
  },
]

const triviaLinksDummy: TriviaCardProps[] = [
  {
    title: '¿Qué tan fan eres de APG?',
    description: 'Pon a prueba tus conocimientos y contesta esta trivia para ganar puntos.',
    points: 350,
    image: 'https://i.postimg.cc/NLqNnNMw/Rectangle-515.png',
    link: 'https://shopify.com/73194995901/account/orders'
  },
  {
    title: '¿Qué tan fan eres de APG?',
    description: 'Pon a prueba tus conocimientos y contesta esta trivia para ganar puntos.',
    points: 350,
    image: 'https://i.postimg.cc/NLqNnNMw/Rectangle-515.png',
    link: 'https://shopify.com/73194995901/account/orders'
  }
]

const redeemedRewardsDummy: RedeemedRewardProps[] = [
  {
    name: 'SPORT BAND',
    image: 'https://i.postimg.cc/nVR2vdLR/Rectangle-234-1.png'
  },
  {
    name: 'SPORT BAND',
    image: 'https://i.postimg.cc/L5HWnhNh/Rectangle-511.png'
  }
]

export default async () => {
  render(<ProfileBlockExtension />, document.body)
}

function ProfileBlockExtension() {
  const i18n = shopify.i18n;

  const {sessionToken} = shopify;
  const modalRef = useRef();

  const name = 'Andre Pierre Gignac'
  const membership = 'Miembro premium'
  const points = 10000
  const badgesSrc = ['https://i.postimg.cc/yg3ZYxtj/Group-1267.png', 'https://i.postimg.cc/yg3ZYxtj/Group-1267.png']
  const completedGameStreak = gamesStreakDummy.reduce(
    (count, game) => count + (game.completed ? 1 : 0),
    0
  );
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
    <s-stack direction='block' gap='large-400'>
    
    {/* Loyalty */}
    <ProfileHeader 
      membership={membership} 
      name={name} 
      points={points} 
      badges={badgesSrc} 
    />
    <s-query-container>
      <s-stack direction='block' gap='base'>
        <s-stack direction='inline' justifyContent='space-between'>

          <s-stack direction='block'>
            <s-heading>
              <s-text>Tu racha de asistencia</s-text>
            </s-heading>
            <s-text>Completa tu asistencia a los partidos de local (3/5)</s-text>
          </s-stack>

          {/* View more */}
          <s-link command='--show' commandFor='match-streak-modal'>
            <s-stack direction='inline' gap='small-500' alignItems='center'>
              Ver más 
              <s-icon type='chevron-right' size='small'></s-icon>
            </s-stack>
          </s-link>
        </s-stack>
        
      
        <s-stack direction='inline' gap='base' overflow='hidden' maxBlockSize='105px'>
          {gamesStreakDummy.map( (game, index) => (
            <StreakItem 
              key={game.name + index} 
              name={game.name} 
              date={game.date} 
              completed={game.completed}/>
          ))}
        </s-stack>
        <s-progress value={completedGameStreak/gamesStreakDummy.length}></s-progress>

      </s-stack>
    </s-query-container>

    {/* <s-query-container> */}
      <s-stack direction='block' gap='small-100'>

        <s-stack direction='block'>
          
        <s-stack direction='inline' justifyContent='space-between'>

          <s-heading>
            <s-text>Nuestros próximos partidos en el volcán:</s-text>
          </s-heading>

          {/* Link de misiones */}
          <s-link command='--show' commandFor='match-links-modal'>
            <s-stack direction='inline' gap='small-500' alignItems='center'>
              Ver más 
              <s-icon type='chevron-right' size='small'></s-icon>
            </s-stack>
          </s-link>
        </s-stack>
          <s-stack direction='inline' gap='small-400' alignItems='center'>
            <s-text>Suma puntos comprando o rentando a través de:</s-text>
            
            <s-box inlineSize='82px' blockSize='15px'>
              <s-image objectFit='contain' inlineSize='fill' aspectRatio='82/15' src='https://i.postimg.cc/Bv9X8zpP/Group-1235.png'></s-image>
            </s-box>
          </s-stack>
        </s-stack>

        <s-grid 
          gridTemplateColumns='@container (inline-size > 768px) 1fr 1fr, (inline-size > 1024px) 1fr 1fr 1fr, 1fr' 
          gap='base' 
          overflow='hidden' 
          maxBlockSize='333px'
        >
          {matchLinksDummy.map(match => (
            <MatchLinkCard
              key={match.name}
              awayImg={match.awayImg} 
              image={match.image}
              name={match.name} 
              date={match.date}
              link={match.link}
            />
          ))}
        </s-grid>

        {/* <s-stack direction='inline' gap='base' overflow='hidden' maxBlockSize='333px'>
          {matchLinksDummy.map(match => (
            <MatchLinkCard
              key={match.name}
              awayImg={match.awayImg} 
              image={match.image}
              name={match.name} 
              date={match.date}
              link={match.link}
            />
          ))}
        </s-stack> */}


      </s-stack>
    {/* </s-query-container> */}

    <s-query-container>
      <s-stack direction='block' gap='small-100'>
        <s-heading>
          <s-text>Trivias disponibles:</s-text>
        </s-heading>

        <s-grid 
          gridTemplateColumns='@container (inline-size > 500px) 1fr 1fr, 1fr' 
          gap='base' 
          overflow='hidden' 
          // maxBlockSize='333px'
        >
          {triviaLinksDummy.map(trivia => (
            <TriviaCard
              key={trivia.title}
              title={trivia.title}
              description={trivia.description} 
              image={trivia.image} 
              points={trivia.points}
              link={trivia.link}
            />
          ))}
        </s-grid>


      </s-stack>
    </s-query-container>

    <s-query-container>
      <s-stack direction='block' gap='small-100'>
        <s-stack direction='inline' justifyContent='space-between'>

          <s-heading>
            <s-text>Misiones disponibles:</s-text>
          </s-heading>

          {/* Link de misiones */}
          <s-link>
            <s-stack direction='inline' gap='small-500' alignItems='center'>
              Ver más 
              <s-icon type='chevron-right' size='small'></s-icon>
            </s-stack>
          </s-link>
        </s-stack>

        <s-grid 
          gridTemplateColumns='@container (inline-size > 500px) 1fr 1fr, 1fr' 
          gap='base'
          overflow='hidden'
        >
          {triviaLinksDummy.map(trivia => (
            <MissionCard
              key={trivia.title}
              title={trivia.title}
              description={trivia.description} 
              image={trivia.image} 
              points={trivia.points}
              link={trivia.link}
            />
          ))}
        </s-grid>
      </s-stack>
    </s-query-container>

    <Rewards redeemedRewards={redeemedRewardsDummy}/>

    <s-query-container>
      <s-grid gridTemplateColumns='@container (inline-size > 500px) 1fr 1fr, 1fr' gap='large-400'>

          <s-stack direction='block' gap='small-100'>
            <s-heading>
              <s-text>Logros:</s-text>
            </s-heading>

            <s-grid gridTemplateColumns='1fr 1fr' gap='@container (inline-size > 500px) large-300, base'>

              <s-stack 
                blockSize='193px' 
                padding='base' 
                border='base' 
                borderRadius='base' 
                background='subdued' 
                justifyContent='center'
              >
                {/* <s-text type='strong'>+15 años de abonado</s-text>
                <s-text>Usa tus cupones para conseguir
                premios exclusivos.</s-text> */}
                <s-box
                  overflow='hidden'
                >
                  <s-image 
                    src='https://i.postimg.cc/yg3ZYxtj/Group-1267.png'
                    alt="Badge"
                    objectFit='cover'
                    aspectRatio="1/1"
                    />
                </s-box>
              </s-stack>

              <s-stack 
                blockSize='193px' 
                padding='base' 
                border='base' 
                borderRadius='base' 
                background='subdued' 
                justifyContent='center'
              >
                {/* <s-text type='strong'>+15 años de abonado</s-text>
                <s-text>Usa tus cupones para conseguir
                premios exclusivos.</s-text> */}
                <s-box
                  overflow='hidden'
                >
                  <s-image 
                    src='https://i.postimg.cc/yg3ZYxtj/Group-1267.png'
                    alt="Badge"
                    objectFit='contain'
                    aspectRatio="1/1"
                    />
                </s-box>
              </s-stack>
              <s-stack 
                blockSize='193px' 
                padding='base' 
                border='base' 
                borderRadius='base' 
                background='subdued' 
                justifyContent='center'
              >
                {/* <s-text type='strong'>+15 años de abonado</s-text>
                <s-text>Usa tus cupones para conseguir
                premios exclusivos.</s-text> */}
                <s-box
                  overflow='hidden'
                >
                  <s-image 
                    src='https://i.postimg.cc/yg3ZYxtj/Group-1267.png'
                    alt="Badge"
                    objectFit='contain'
                    aspectRatio="1/1"
                    />
                </s-box>
              </s-stack>
            </s-grid>


          </s-stack>

          <s-stack direction='block' gap='small-100'>
            <s-stack direction='inline' justifyContent='space-between'>

              <s-heading>
                <s-text>Actividad reciente:</s-text>
              </s-heading>

              {/* Link de misiones */}
              <s-link>
                <s-stack direction='inline' gap='small-500' alignItems='center'>
                  Ver más 
                  <s-icon type='chevron-right' size='small'></s-icon>
                </s-stack>
              </s-link>
            </s-stack>

            <s-stack 
              direction='block'
              border='base'
              borderRadius='base'
              padding='@container (inline-size > 500px) large-300 large-200, base'
              gap='large-300'
            >
              <s-stack 
                direction='block'
              >
                <s-text>
                  Compraste $1000 pesos en mercancía oficial de Tigretienda
                </s-text>
                <s-text color='subdued'>
                  Octubre 20, 2025
                </s-text>
                <s-stack paddingBlockStart='base' direction='inline' gap='small-500' alignItems='center'>
                  <s-box
                    inlineSize="13px"
                    blockSize="13px"
                  >
                    <s-image 
                      src={pointsIcon}
                      alt="Badge"
                      inlineSize="fill"
                      aspectRatio="1/1"
                    />
                  </s-box>
                  <s-text> {points} puntos</s-text>
                </s-stack>
              </s-stack>

              <s-stack 
                direction='block'
              >
                <s-text>
                  Compraste $1000 pesos en mercancía oficial de Tigretienda
                </s-text>
                <s-text color='subdued'>
                  Octubre 20, 2025
                </s-text>
                <s-stack paddingBlockStart='base' direction='inline' gap='small-500' alignItems='center'>
                  <s-box
                    inlineSize="13px"
                    blockSize="13px"
                  >
                    <s-image 
                      src={pointsIcon}
                      alt="Badge"
                      inlineSize="fill"
                      aspectRatio="1/1"
                    />
                  </s-box>
                  <s-text> {points} puntos</s-text>
                </s-stack>
              </s-stack>

              <s-stack 
                direction='block'
              >
                <s-text>
                  Compraste $1000 pesos en mercancía oficial de Tigretienda
                </s-text>
                <s-text color='subdued'>
                  Octubre 20, 2025
                </s-text>
                <s-stack paddingBlockStart='base' direction='inline' gap='small-500' alignItems='center'>
                  <s-box
                    inlineSize="13px"
                    blockSize="13px"
                  >
                    <s-image 
                      src={pointsIcon}
                      alt="Badge"
                      inlineSize="fill"
                      aspectRatio="1/1"
                    />
                  </s-box>
                  <s-text> {points} puntos</s-text>
                </s-stack>
              </s-stack>
            </s-stack>

            

          </s-stack>
      </s-grid>
    </s-query-container>

    </s-stack>

    <s-modal
      id="match-links-modal"
      ref={modalRef}
      size='max'
      heading={"Nuestros próximos partidos en el volcán:"}
    >
      <s-query-container>
        <s-grid 
        gridTemplateColumns='@container (inline-size > 722px) 1fr 1fr, (inline-size > 915px) 1fr 1fr 1fr, 1fr' 
        gap='base' 
        overflow='hidden' 
        // maxBlockSize='333px'
        >
        {matchLinksDummy.map(match => (
          <MatchLinkCard
          key={match.name}
          awayImg={match.awayImg} 
          image={match.image}
          name={match.name} 
          date={match.date}
          link={match.link}
          />
        ))}
        </s-grid>
      </s-query-container>
    </s-modal>

    <s-modal
      id="match-streak-modal"
      ref={modalRef}
      size='max'
      heading={"Tu racha de asistencia"}
    >
      <s-query-container>
        <s-stack 
        // gridTemplateColumns='@container (inline-size > 722px) 1fr 1fr, (inline-size > 915px) 1fr 1fr 1fr, 1fr' 
        direction='inline'
        gap='base' 
        overflow='hidden' 
        // maxBlockSize='333px'
        >
        {gamesStreakDummy.map( (game, index) => (
            <StreakItem 
              key={game.name + index} 
              name={game.name} 
              date={game.date} 
              completed={game.completed}/>
          ))}
        </s-stack>
      </s-query-container>
    </s-modal>

    <s-modal
          id="buy-reward-modal"
          ref={modalRef}
          size='max'
          heading={"Próximos partidos"}
          >
          <s-grid 
          gridTemplateColumns='@container (inline-size > 768px) 1fr 1fr, (inline-size > 1024px) 1fr 1fr 1fr, 1fr' 
          gap='base' 
          overflow='hidden' 
          // maxBlockSize='333px'
          >
          {matchLinksDummy.map(match => (
            <MatchLinkCard
            key={match.name}
            awayImg={match.awayImg} 
            image={match.image}
            name={match.name} 
            date={match.date}
            link={match.link}
            />
          ))}
        </s-grid>
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

          {/* <s-image 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvhcMXzhcvLbyphVk6AAeN6jZYQmdTYeiLpxL-A7tlYTefFWMA'
            sizes="(max-width: 30em) 50vw, 100vw"
            >
            </s-image>
            <s-text>Texto</s-text> */}
          {/* <s-grid 
          gridTemplateColumns='@container (inline-size > 768px) 1fr 1fr, (inline-size > 1024px) 1fr 1fr 1fr, 1fr' 
          gap='base' 
          overflow='visible'
        >
          {matchLinksDummy.map(match => (
            <MatchLinkCard
              key={match.name}
              awayImg={match.awayImg} 
              image={match.image}
              name={match.name} 
              date={match.date}
              link={match.link}
            />
          ))}
          {matchLinksDummy.map(match => (
            <MatchLinkCard
              key={match.name}
              awayImg={match.awayImg} 
              image={match.image}
              name={match.name} 
              date={match.date}
              link={match.link}
            />
          ))}
        </s-grid> */}
        </s-modal>
    </>
  );
}

type StreakItemProps = {
  name: string;
  date: string;
  completed: boolean;
}

function StreakItem({name, date, completed}: StreakItemProps) {
  return (
    <s-box 
      borderWidth="base"
      background={completed ? 'base' : 'subdued'}
      borderRadius='base'
      padding="small-100"
      inlineSize='@container (inline-size > 500px) 190px, 190px'
      blockSize='105px'
    > 
      <s-stack direction='block' justifyContent='space-between' blockSize='100%'>
        {completed ? 
          // <s-icon type='check-circle' size='large-100'></s-icon>
          <s-box inlineSize="24px" blockSize="24px" >
            <s-image 
              src={completedCheckIcon}
              alt="completedCheckIcon"
              inlineSize="fill"
              aspectRatio="1/1"
            />
          </s-box>
        :
          <s-icon type='circle' size='large-100'></s-icon>
        }

        <s-stack direction='block'>
          <s-text>{name}</s-text>
          <s-text color='subdued'>{date}</s-text>
        </s-stack>
      </s-stack>
    </s-box>  
  )
}

type MatchLinkCardProps = {
  image: string;
  awayImg: string
  name:string;
  date:string;
  link:string;
}

function MatchLinkCard ({image, awayImg, name, date, link}: MatchLinkCardProps) {
  return (
    <s-box 
      borderWidth="base"
      borderRadius='base'
      padding="large-300"
      // inlineSize='@container (inline-size > 768px) 50%, (inline-size > 1024px) 320px, 100%'
      blockSize='333px'
    > 
    <s-stack direction='block' alignItems='center' justifyContent='space-between' blockSize='100%'>

      <s-stack direction='block' gap='large-200' blockSize='100%'>

      <s-stack direction='inline' gap='large-400' alignItems='center'>
          <s-box inlineSize='80px' blockSize='80px'>
            <s-image inlineSize='fill' src="https://imgs.search.brave.com/2BO9iHdmg7lxbsPc7WxTRrGEJyHuPF_pN7DA4MqPCfM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzIvdGlncmVz/LXVhbmwtbG9nby1w/bmdfc2Vla2xvZ28t/NTA3NzUyLnBuZw"></s-image>
          </s-box>

          <s-text type='strong'>vs</s-text>

          <s-box inlineSize='80px' blockSize='80px'>
            <s-image inlineSize='fill' src={awayImg}></s-image>
          </s-box>

        </s-stack>

        <s-stack direction='block' alignItems='center' alignContent='center'>
          <s-text>{name}</s-text>
          <s-text>{date}</s-text>
        </s-stack>
      </s-stack>

      <s-stack direction='block' gap='large-200' alignItems='center'>
        <s-button variant='primary' inlineSize='fill' href={link} target='_blank'>Comprar boletos</s-button>
        <s-stack direction='block' alignItems='center' alignContent='center'>
          <s-text>Eres abonado y no podrás asistir?</s-text>
          <s-text type='strong'>Haz click y renta tu abono</s-text>
        </s-stack>
      </s-stack>
    </s-stack>
  </s-box>  
  )
}

type TriviaCardProps = {
  title: string;
  description: string;
  image: string;
  points: number;
  link:string;
}

function TriviaCard({title, description, image, points, link}: TriviaCardProps) {
  return (
    <s-clickable 
      borderRadius='base' 
      border="base" 
      padding="@container (inline-size > 500px) base, small"
      inlineSize='100%'
      maxBlockSize='229px'
      href={link}
      target='_blank'
      background='base'
    >
      <s-grid 
        gridTemplateColumns='1fr'
        gap='base'
      >
        {/* Desktop img */}
        <s-box overflow='hidden' inlineSize='98px' blockSize='98px'>
          <s-image objectFit='cover' borderRadius='base' inlineSize='fill' src={image}></s-image>
        </s-box>


        <s-stack direction='block' gap='base' justifyContent='@container (inline-size > 500px) normal, space-between'>
          <s-stack direction='block'>
            <s-text type='strong'>{title}</s-text>
            <s-paragraph type='small'>{description}</s-paragraph>
          </s-stack>

          <s-stack direction='inline' justifyContent='space-between' alignItems='center'>
            <s-stack direction='inline' gap='small-500' alignItems='center'>
              <s-text>Suma</s-text>
              <s-box
                inlineSize="13px"
                blockSize="13px"
              >
                <s-image 
                  src={pointsIcon}
                  alt="pointsIcon"
                  inlineSize="fill"
                  aspectRatio="1/1"
                />
              </s-box>
              <s-text> {points} puntos</s-text>
            </s-stack>

            <s-box inlineSize="24px" blockSize="24px" >
              <s-image 
                src={showMoreArrowIcon}
                alt="showMoreArrowIcon"
                inlineSize="fill"
                aspectRatio="1/1"
              />
            </s-box>
            {/* <s-stack borderRadius='max' border='base' justifyContent='center' alignItems='center' blockSize='34px' inlineSize='34px' display='@container (inline-size > 500px) auto, none'>
              <s-link>
                <s-icon type='chevron-right'></s-icon>
              </s-link>
            </s-stack> */}
          </s-stack>
        </s-stack>
      </s-grid>
    </s-clickable>
  )
}

type MissionCardProps = {
  title: string;
  description: string;
  image: string;
  points: number;
  link:string;
}

function MissionCard({title, description, image, points, link}: MissionCardProps) {
  return (
    <s-clickable 
      borderRadius='base' 
      border="base" 
      padding="small"
      paddingInline='@container (inline-size > 500px) base, small'
      inlineSize='100%'
      maxBlockSize='@container (inline-size > 500px) 120px,133px'
      href={link}
      target='_blank'
    >
      <s-grid 
        gridTemplateColumns='@container (inline-size > 500px) auto 1fr, 70px 1fr'
        gap='base'
      >
        {/* Desktop img */}
        <s-box overflow='hidden' display='@container (inline-size > 500px) auto, none' inlineSize='98px' blockSize='98px'>
          <s-image objectFit='cover' borderRadius='base' inlineSize='fill' src={image}></s-image>
        </s-box>
        {/* Mobile img */}
        <s-box overflow='hidden' display='@container (inline-size > 500px) none, auto' blockSize='111px'>
          <s-image objectFit='cover' borderRadius='base' aspectRatio='70/111' inlineSize='fill' src={image}></s-image>
        </s-box>

        <s-stack direction='block' gap='base' justifyContent='space-between'>
          <s-stack direction='block'>
            <s-text type='strong'>{title}</s-text>
            <s-paragraph type='small'>{description}</s-paragraph>
          </s-stack>


          <s-stack direction='inline' gap='small-500' alignItems='center'>
              <s-text>Suma</s-text>
              <s-box
                inlineSize="13px"
                blockSize="13px"
              >
                <s-image 
                  src={pointsIcon}
                  alt="pointsIcon"
                  inlineSize="fill"
                  aspectRatio="1/1"
                />
              </s-box>
              <s-text> {points} puntos</s-text>
            </s-stack>
        </s-stack>
      </s-grid>
    </s-clickable>
  )
}
type RewardsProps = {
  redeemedRewards: RedeemedRewardProps[]
}

function Rewards({redeemedRewards}: RewardsProps){
  return (
    <s-query-container>
      <s-box 
        padding="@container (inline-size > 500px) large-200 large-300, large-200 base" 
        background="subdued" 
        borderRadius='base'
      >
          {/* @container (inline-size > 800px) 227px 1fr, 1fr  iPad Responsive*/}
          <s-grid gridTemplateColumns='@container (inline-size > 768px) 227px 1fr, 1fr'
            gap='large-300'
          >

            <s-stack direction='block' gap='large-200'>
              <s-stack direction='inline' gap='small-500'>
                <s-icon type='gift-card'>
                  </s-icon>
                  <s-heading>
                    <s-text>
                      Mis recompensas:
                    </s-text>
                  </s-heading>
              </s-stack>
              <s-button variant='primary' inlineSize='fill'>
                Ver todas mis recompensas
              </s-button>
            </s-stack>

            <s-grid 
              gridTemplateColumns='@container (inline-size > 768px) 1fr 1fr, 1fr'
              gap='base'
            >
              {redeemedRewards.map( item =>
                <RedeemedReward 
                  key={item.name} 
                  name={item.name} 
                  image={item.image}
                />
              )}
              
            </s-grid>

            
          </s-grid>
      </s-box>
    </s-query-container>
  )
}

type RedeemedRewardProps = {
  name: string,
  image: string
}

function RedeemedReward({name, image}: RedeemedRewardProps) {
  return (
    <s-clickable background='base' inlineSize='100%' blockSize='94px' borderRadius='base' command='--show' commandFor='buy-reward-modal'>
      <s-grid gridTemplateColumns='100px 1fr' blockSize='100%' alignContent='center'>

        <s-stack padding='small-300' overflow='hidden' inlineSize='100px' blockSize='94px' maxBlockSize='100%' justifyContent='center'>
            <s-image objectFit='contain' borderRadius='base' aspectRatio='1/1' inlineSize='auto' src={image}></s-image>
        </s-stack>

        <s-box 
          borderStyle='none none none dashed' 
          borderWidth='base' 
          blockSize='100%'
          paddingInlineStart='base'
          >
          <s-stack justifyContent='center' blockSize='100%'>
            <s-text type='strong'>{name}</s-text>
            <s-stack direction='inline' gap='small-500'>
              <s-text type='small' color='subdued'>Válido en</s-text>
              <s-text type='small'>tigretienda.com</s-text>
            </s-stack>
          </s-stack>
        </s-box>
          </s-grid>
    </s-clickable>
  )
}