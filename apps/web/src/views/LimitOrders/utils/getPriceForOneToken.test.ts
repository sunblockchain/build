import { CurrencyAmount, ERC20Token } from '@pancakeswap/sdk'
import getPriceForOneToken from './getPriceForOneToken'

const CAKE = new ERC20Token(56, '0x228e2A0011662AE5A7176B279F590b2A58116DEF', 18, 'CAKE', 'PancakeSwap Token')
const BUSD = new ERC20Token(56, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD')
const DOGE = new ERC20Token(56, '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 8, 'DOGE', 'Binance-Peg Dogecoin')

const EIGHT_DECIMALS = 10n ** 8n
const EIGHTEEN_DECIMALS = 10n ** 18n
const ZERO = 0n * EIGHTEEN_DECIMALS
const ONE = 1n * EIGHTEEN_DECIMALS
const ONE_EIGHT_DEC = 1n * EIGHT_DECIMALS
const FIVE = 5n * EIGHTEEN_DECIMALS
const FIVE_EIGHT_DEC = 5n * EIGHT_DECIMALS

describe('limitOrders/utils/getPriceForOneToken', () => {
  describe.each([
    [CurrencyAmount.fromRawAmount(CAKE, ONE), CurrencyAmount.fromRawAmount(BUSD, ONE), '1'],
    [CurrencyAmount.fromRawAmount(CAKE, FIVE), CurrencyAmount.fromRawAmount(BUSD, FIVE), '1'],
    [CurrencyAmount.fromRawAmount(CAKE, ONE), CurrencyAmount.fromRawAmount(BUSD, FIVE), '5'],
    [CurrencyAmount.fromRawAmount(CAKE, FIVE), CurrencyAmount.fromRawAmount(BUSD, ONE), '0.2'],
    [CurrencyAmount.fromRawAmount(DOGE, ONE_EIGHT_DEC), CurrencyAmount.fromRawAmount(BUSD, ONE), '1'],
    [CurrencyAmount.fromRawAmount(DOGE, FIVE_EIGHT_DEC), CurrencyAmount.fromRawAmount(BUSD, FIVE), '1'],
    [CurrencyAmount.fromRawAmount(DOGE, ONE_EIGHT_DEC), CurrencyAmount.fromRawAmount(BUSD, FIVE), '5'],
    [CurrencyAmount.fromRawAmount(DOGE, FIVE_EIGHT_DEC), CurrencyAmount.fromRawAmount(BUSD, ONE), '0.2'],
    [CurrencyAmount.fromRawAmount(CAKE, ZERO), CurrencyAmount.fromRawAmount(BUSD, ONE), undefined],
    [CurrencyAmount.fromRawAmount(CAKE, ONE), CurrencyAmount.fromRawAmount(BUSD, ZERO), undefined],
  ])(`returns correct price`, (input, output, expected) => {
    it(`for ${input.toSignificant(6)} ${input.currency.symbol} -> ${output.toSignificant(6)} ${
      output.currency.symbol
    }`, () => {
      const price = getPriceForOneToken(input, output)
      expect(price?.toSignificant(6)).toBe(expected)
    })
  })
})
