import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useRef } from 'react'
import { styled } from 'styled-components'
import { useAllNewsArticle } from '../../hooks/useAllArticle'

const NewsCard = styled.div`
  vertical-align: top;
  width: 280px;
  height: 387px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0px 2px 0px 0px ${({ theme }) => theme.colors.cardBorder};
  display: inline-block;
  margin-right: 34px;
  cursor: pointer;
  scroll-snap-align: start;
  &:last-child {
    scroll-snap-align: end;
  }
`
const ImageBox = styled.div`
  height: 200px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
`
const ContentBox = styled.div`
  height: 187px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-top: none;
  padding: 20px;
`

const DescriptionBox = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin-top: 16px;
  max-height: 56px;
`

const CardWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  border-radius: 24px;
  padding-bottom: 5px;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`

export const NewsSection: React.FC = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const scrollWrapper = useRef<HTMLDivElement>(null)
  const { articlesData, isFetching } = useAllNewsArticle()
  return (
    <Flex flexDirection="column" style={{ gap: 36 }}>
      <Flex justifyContent="center" style={{ gap: 8 }}>
        <Text fontSize={40} fontWeight={600} textAlign="center">
          {t('Community talk platform will come ')}
        </Text>
        <Text fontSize={40} fontWeight={600} color="secondary" textAlign="center">
          {t('SOON')}
        </Text>
      </Flex>
      <Flex>
        <CardWrapper ref={scrollWrapper}>
          {!isFetching &&
            articlesData?.data.map((d) => (
              <NewsCard
                onClick={() => {
                  window.open(d.newsOutBoundLink, '_blank', 'noopener noreferrer')
                }}
              >
                <ImageBox>
                  <img src={d.imgUrl} alt="" />
                </ImageBox>
                <ContentBox>
                  <Flex justifyContent="space-between">
                    <Text bold fontSize={12} color={theme.colors.textSubtle} lineHeight="120%">
                      {t('From')} [{d.newsFromPlatform}]
                    </Text>
                    <Text bold fontSize={12} color={theme.colors.textSubtle} lineHeight="120%">
                      {new Date(d.createAt).toLocaleString('en-US', {
                        month: 'short',
                        year: 'numeric',
                        day: 'numeric',
                      })}
                    </Text>
                  </Flex>
                  <Text bold mt="16px" lineHeight="120%" minHeight="66px" style={{ whiteSpace: 'pre-wrap' }}>
                    {d.title}
                  </Text>
                  <DescriptionBox>{d.description}</DescriptionBox>
                </ContentBox>
              </NewsCard>
            ))}
        </CardWrapper>
        
      </Flex>
    </Flex>
  )
}
