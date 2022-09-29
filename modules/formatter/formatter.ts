import regions from './regions';

export class Formatter {
  private regions: string[];
  private currencyFormatter: Intl.NumberFormat;
  private decimalFormatter: Intl.NumberFormat;
  private percFormatter: Intl.NumberFormat;
  private language: string;
  constructor(language: string) {
    this.regions = Object.values(regions);

    if (this.regions.includes(language)) {
      this.language = language;
      this.currencyFormatter = Intl.NumberFormat(language, {
        currency: 'EUR',
        style: 'currency',
      });
      this.decimalFormatter = Intl.NumberFormat(language, {
        maximumFractionDigits: 2,
      });
      this.percFormatter = Intl.NumberFormat(language, {
        style: 'decimal',
        maximumFractionDigits: 2,
      });
    } else {
      throw Error('Unrecognized language.');
    }
  }

  toDecimal(num: number, precision?: number) {
    if (precision) {
      const currentOpts = this.decimalFormatter.resolvedOptions();
      const newFormatter = Intl.NumberFormat(this.language, {
        ...currentOpts,
        maximumFractionDigits: precision,
      });
      return newFormatter.format(num);
    }
    return this.decimalFormatter.format(num);
  }

  toPerc(num: number, precision?: number) {
    if (precision) {
      const currentOpts = this.percFormatter.resolvedOptions();

      const newFormatter = Intl.NumberFormat(this.language, {
        ...currentOpts,
        maximumFractionDigits: precision,
      });
      return newFormatter.format(num);
    }
    return this.decimalFormatter.format(num);
  }

  toCurrency(
    num: number,
    precision?: number,
    currency?: string,
    showName?: boolean
  ) {
    if (precision || currency || showName) {
      const currentOpts = this.currencyFormatter.resolvedOptions();

      const newFormatter = Intl.NumberFormat(this.language, {
        ...currentOpts,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        // maximumSignificantDigits: 3,
        // maximumFractionDigits: precision
        //   ? precision
        //   : currentOpts.maximumFractionDigits,
        currency: currency ? currency : currentOpts.currency,
        currencyDisplay: showName ? 'name' : currentOpts.currencyDisplay,
      });
      return newFormatter.format(num);
    }
    return this.currencyFormatter.format(num);
  }

  toInt(num: number) {}
}
