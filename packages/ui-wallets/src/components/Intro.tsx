import { Trans } from '@pancakeswap/localization'
import { AtomBox, Button, Heading, Image, LinkExternal, Text } from '@pancakeswap/uikit'
import { useCallback, useState } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

const IntroSteps = [
  {
    title: <Trans>BITSCLOUD Web3 Wallet</Trans>,
    icon: '/safety.png',
    description: <Trans>BITSCLOUd Web3 Wallet which we develop will come soon.</Trans>,
  },
  {
    title: <Trans>Download on main web</Trans>,
    icon: '/logo.png',
    description: <Trans>For DApps of Bitscloud.</Trans>,
  },
]

const StepDot = ({ active, place, onClick }: { active: boolean; place: 'left' | 'right'; onClick: () => void }) => (
  <AtomBox padding="4px" onClick={onClick} cursor="pointer">
    <AtomBox
      bgc={active ? 'secondary' : 'inputSecondary'}
      width="56px"
      height="8px"
      borderLeftRadius={place === 'left' ? 'card' : '0'}
      borderRightRadius={place === 'right' ? 'card' : '0'}
    />
  </AtomBox>
)

const StepIntro = ({ docLink, docText }: { docLink: string; docText: string }) => {
  const [step, setStep] = useState(0)
  const [swiper, setSwiper] = useState<SwiperClass | undefined>(undefined)

  const handleRealIndexChange = useCallback((swiperInstance: SwiperClass) => {
    setStep(swiperInstance.realIndex)
  }, [])

  const handleStepClick = useCallback(
    (stepIndex: number) => {
      return () => {
        setStep(stepIndex)
        swiper?.slideTo(stepIndex)
      }
    },
    [swiper],
  )

  return (
    <AtomBox
      display="flex"
      width="100%"
      flexDirection="column"
      style={{ gap: '24px' }}
      mx="auto"
      my="48px"
      textAlign="center"
      alignItems="center"
    >
      <Swiper
        loop
        initialSlide={0}
        slidesPerView={1}
        modules={[Autoplay]}
        onSwiper={setSwiper}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        onRealIndexChange={handleRealIndexChange}
        style={{ width: '100%', marginLeft: '0px', marginRight: '0px' }}
      >
        {IntroSteps.map((introStep) => (
          <SwiperSlide key={introStep.icon}>
            <Heading as="h2" color="secondary">
              {introStep.title}
            </Heading>
            <Image m="auto" src={introStep.icon} width={198} height={178} />
            <Text maxWidth="368px" m="auto" small color="textSubtle">
              {introStep.description}
            </Text>
          </SwiperSlide>
        ))}
      </Swiper>
      <AtomBox display="flex">
        <StepDot place="left" active={step === 0} onClick={handleStepClick(0)} />
        <StepDot place="right" active={step === 1} onClick={handleStepClick(1)} />
      </AtomBox>
      <Button minHeight={40} variant="subtle" external as={LinkExternal} color="backgroundAlt" href={docLink}>
        {docText}
      </Button>
    </AtomBox>
  )
}

export default StepIntro
