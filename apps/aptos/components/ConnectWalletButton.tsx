import { Trans, useTranslation } from '@pancakeswap/localization'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { Button, ButtonProps } from '@pancakeswap/uikit'
import { wallets } from 'config/wallets'
import { useAuth } from 'hooks/useAuth'
import { useState } from 'react'

export const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { login } = useAuth()

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      <Button width="100%" onClick={handleClick} {...props}>
        {children || <Trans>Connect Wallet</Trans>}
      </Button>
      <WalletModalV2
        docText={t('Check BITSCLOUD Wallet')}
        docLink="https://bitscloud.co"
        isOpen={open}
        wallets={wallets}
        login={login}
        onDismiss={() => setOpen(false)}
      />
    </>
  )
}
