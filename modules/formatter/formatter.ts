import regions from './regions';

export default class Formatter {
  private intFormatter: Intl.NumberFormat;
  private currencyFormatter: Intl.NumberFormat;
  private decimalFormatter: Intl.NumberFormat;
  private percFormatter: Intl.NumberFormat;
  private timeStampFormatter: Intl.DateTimeFormat;
  private dateFormatter: Intl.DateTimeFormat;
  private timeFormatter: Intl.DateTimeFormat;
  private language: string;
  constructor(language?: string) {
    const navLang = navigator.language || 'it';
    const currentLanguage = language ? language : navLang;

    if (currentLanguage) {
      this.language = currentLanguage;
      this.currencyFormatter = Intl.NumberFormat(this.language, {
        currency: 'EUR',
        style: 'currency',
      });
      this.decimalFormatter = Intl.NumberFormat(this.language, {
        maximumFractionDigits: 2,
      });
      this.percFormatter = Intl.NumberFormat(this.language, {
        style: 'decimal',
        maximumFractionDigits: 2,
      });
      this.intFormatter = Intl.NumberFormat(this.language, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      this.timeStampFormatter = Intl.DateTimeFormat(this.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        second: '2-digit',
        minute: '2-digit',
        hour: '2-digit',
      });
      this.dateFormatter = Intl.DateTimeFormat(this.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      this.timeFormatter = Intl.DateTimeFormat(this.language, {
        second: '2-digit',
        minute: '2-digit',
        hour: '2-digit',
      });
    } else {
      throw Error('Unrecognized language.');
    }
  }

  toDecimal(num: number, options: { precision?: number; isCompact?: boolean }) {
    let formatter = this.decimalFormatter;
    const { precision, isCompact } = options;
    if (!isNaN(precision)) {
      const currentOpts = this.decimalFormatter.resolvedOptions();
      const newFormatter = Intl.NumberFormat(this.language, {
        ...currentOpts,
        maximumFractionDigits: precision,
      });
      formatter = newFormatter;
    }
    return isCompact
      ? this.toCompact(num, formatter.resolvedOptions())
      : this.decimalFormatter.format(num);
  }

  toPerc(num: number, options: { precision?: number }) {
    const { precision } = options;
    let formatter = this.percFormatter;
    if (!isNaN(precision)) {
      const currentOpts = this.percFormatter.resolvedOptions();

      const newFormatter = Intl.NumberFormat(this.language, {
        ...currentOpts,
        maximumFractionDigits: precision,
      });
      formatter = newFormatter;
    }
    return formatter.format(num);
  }

  toCurrency(
    num: number,
    options: {
      precision?: number;
      currency?: string;
      showName?: boolean;
      isCompact?: boolean;
    }
  ) {
    const { precision, currency, showName, isCompact } = options;
    let formatter = this.currencyFormatter;
    if (!isNaN(precision) || currency || showName) {
      const currentOpts = this.currencyFormatter.resolvedOptions();
      const newFormatter = Intl.NumberFormat(this.language, {
        ...currentOpts,
        minimumFractionDigits: !isNaN(precision)
          ? precision
          : currentOpts.maximumFractionDigits,
        maximumFractionDigits: !isNaN(precision)
          ? precision
          : currentOpts.maximumFractionDigits,
        currency: currency ? currency : currentOpts.currency,
        currencyDisplay: showName ? 'name' : currentOpts.currencyDisplay,
      });
      formatter = newFormatter;
    }
    return isCompact
      ? this.toCompact(num, formatter.resolvedOptions())
      : this.currencyFormatter.format(num);
  }

  toInt(num: number, isCompact?: boolean) {
    return isCompact
      ? this.toCompact(num, this.intFormatter.resolvedOptions())
      : this.intFormatter.format(num);
  }

  toDate(date: Date) {
    return this.dateFormatter.format(date);
  }

  toTime(date: Date) {
    return this.timeFormatter.format(date);
  }

  toTimeStamp(date: Date) {
    return this.timeStampFormatter.format(date);
  }

  private toCompact(num: number, opts: Intl.NumberFormatOptions) {
    const compactFormatter = Intl.NumberFormat('en', {
      ...opts,
      maximumSignificantDigits:
        opts.maximumFractionDigits > 0 ? opts.maximumFractionDigits + 3 : 3,
      notation: 'compact',
      compactDisplay: 'short',
    });
    const parts = compactFormatter.formatToParts(num);
    const separators = this.getSeparator();
    return parts
      .map((el) => {
        if (el.type == 'decimal') {
          return el.value.replace('.', separators.decimal);
        }
        if (el.type == 'group') {
          return el.value.replace(',', separators.thousand);
        }
        return el.value;
      })
      .join('');
  }
  private getSeparator(): { decimal: string; thousand: string } {
    const num = 1000.1;
    const locale = num.toLocaleString(this.language);
    console.log(locale);
    return { decimal: locale[5], thousand: locale[1] };
  }
}
