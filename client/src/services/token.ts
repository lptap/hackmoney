export class Token {
  public readonly address: string
  public readonly name?: string
  public readonly symbol?: string
  public readonly decimals: number

  constructor(address: string, decimals: number, name?: string, symbol?: string) {
    this.address = address
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
  }
}
