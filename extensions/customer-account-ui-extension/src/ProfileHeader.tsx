const pointsIcon = 'https://cdn.shopify.com/s/files/1/0939/7413/5068/files/Group_1187.svg?v=1762213297';
type ProfileHeaderProps = {
    membership: string;
    name: string
    points: number;
    badges: string[];
  }

export default function ProfileHeader({ membership, name, points, badges}: ProfileHeaderProps) {
    console.log(membership, name, points, badges);
  
    return (
      <s-query-container>
        <s-box padding="@container (inline-size > 500px) large-300, large-200" background="subdued" borderRadius='base'>
          <s-stack direction="inline" gap="base" justifyContent='space-between'>
            {/* Loyalty Profile */}
            <s-stack direction="block" gap="base">
  
              <s-press-button pressed>{membership}</s-press-button>
              <s-heading>
                <s-text type="strong">{name}</s-text>
              </s-heading>
  
              <s-stack direction='inline' gap='small-500' alignItems='center'>
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
            
            {/* Badges */}
            <s-stack 
              paddingBlock="@container (inline-size > 500px) base, 0" 
              direction='inline' 
              gap="@container (inline-size > 500px) base, 0" 
            >
              {badges.map(badge => (
                  <s-box
                  key={badge}
                  inlineSize="@container (inline-size > 500px) 72px, 42px"
                  blockSize="@container (inline-size > 500px) 72px, 42px"
                  // minBlockSize='100%'
                  >
                  <s-image 
                    src={badge}
                    alt="Badge"
                    inlineSize="fill"
                    aspectRatio="1/1"
                    />
                </s-box>
              ))}
              {/* <s-box 
                inlineSize="@container (inline-size > 500px) 72px, 42px"
                blockSize="@container (inline-size > 500px) 72px, 42px"
                // minBlockSize='100%'
                >
                <s-image 
                  src="https://i.postimg.cc/yg3ZYxtj/Group-1267.png"
                  alt="Badge"
                  inlineSize="fill"
                  aspectRatio="1/1"
                  />
              </s-box> */}
            </s-stack>
          </s-stack>
        </s-box>
        </s-query-container>
    )
  }