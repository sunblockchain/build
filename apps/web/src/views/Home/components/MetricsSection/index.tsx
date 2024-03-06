import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/legacy/image'
import { styled } from 'styled-components'
import { ChainTags } from './ChainTags'
import { MetricsCard } from './MetricsCard'

const ImageLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`
const BnbBallRocket = styled.div`
  position: absolute;
  left: -65px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    bottom: 151px;
    left: 20px;
  }
`

const AptosBallRocket = styled.div`
  position: absolute;
  top: 0px;
  right: 98px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    top: 72px;
    right: 119px;
  }
`

const Stats = () => {
  const { t } = useTranslation()
  const { data: tvl = 0 } = useQuery<number>({
    queryKey: ['tvl'],
    enabled: false,
  })
  const { data: txCount = 0 } = useQuery<number>({
    queryKey: ['totalTx30Days'],
    enabled: false,
  })
  const { data: addressCount = 0 } = useQuery<number>({
    queryKey: ['addressCount30Days'],
    enabled: false,
  })
  const { isMobile, isSm, isMd, isXxl } = useMatchBreakpoints()

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" overflow="hidden">
      <Text textAlign="center" lineHeight="110%" fontWeight={600} mb="4px" fontSize={isMobile ? '20px' : '32px'}>
        {t('Trading on DEX - Multichains Ecosystem:')}
      </Text>
      <Text
        textAlign="center"
        lineHeight="110%"
        fontWeight={600}
        fontSize={isMobile ? '20px' : '32px'}
        mb={isMobile ? '32px' : '48px'}
      >
        {t('BITSCLOUD’s Unlimited DEX where connect with another DEXs (Pancake, UniSwap...')}
      </Text>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection={isMobile ? 'column' : 'row'}
        width={['100%', '100%', '100%', '800px']}
        style={{ gap: isMobile ? 32 : 50 }}
        mb={isMobile ? '32px' : '48px'}
        flexWrap="wrap"
      >
        <MetricsCard
          width={isSm || isMd ? '100%' : 'auto'}
          title={t('Total Users:')}
          value={addressCount}
          description={t('in the last 30 days')}
        />
        <MetricsCard title={t('Total Trades:')} value={txCount} description={t('in the last 30 days')} />
        <MetricsCard title={t('Total Value Locked:')} value={tvl} description={t('in the last 30 days')} prefix="$" />
      </Flex>
      <ChainTags />
      <ImageLayer>
        <BnbBallRocket>
          <Image
            src='/2.png'
            alt="bnbBallRocket"
            width={144}
            height={168}
            unoptimized
          />
        </BnbBallRocket>
        
        <AptosBallRocket>
          <Image
            src='/3.png'
            alt="aptosBallRocket"
            width={isXxl ? 84 : 53}
            height={isXxl ? 101 : 64}
            unoptimized
          />
        </AptosBallRocket>
      </ImageLayer>
    </Flex>
  )
}

export default Stats
