import { Args, Query, Resolver } from '@nestjs/graphql';
import { subDays } from 'date-fns';
import { sortBy } from 'lodash';
import { decodeMessages } from 'src/server/utils/customRecords';
import { CurrentUser } from '../../security/security.decorators';
import { UserId } from '../../security/security.types';
import { TransactionsService } from './transactions.service';
import { GetResumeType } from './transactions.types';

@Resolver()
export class TransactionsResolver {
  constructor(private transactionsService: TransactionsService) {}

  @Query(() => GetResumeType)
  async getResume(
    @CurrentUser() user: UserId,
    @Args('offset', { nullable: true }) offset: number,
    @Args('limit', { nullable: true }) limit: number
  ) {
    const start = offset || 0;
    const end = (offset || 0) + (limit || 7);

    const today = new Date();
    const startDate = subDays(today, start).toISOString();
    const endDate = subDays(today, end).toISOString();

    const payments = await this.transactionsService.getPaymentsBetweenDates(
      user.id,
      startDate,
      endDate
    );

    const mappedPayments = payments.map(payment => ({
      ...payment,
      type: 'payment',
      date: payment.created_at,
      destination_node: { publicKey: payment.destination },
      hops: [...payment.hops.map(hop => ({ publicKey: hop }))],
      isTypeOf: 'PaymentType',
    }));

    const invoices = await this.transactionsService.getInvoicesBetweenDates(
      user.id,
      startDate,
      endDate
    );

    const mappedInvoices = invoices.map(invoice => ({
      type: 'invoice',
      date: invoice.confirmed_at || invoice.created_at,
      ...invoice,
      isTypeOf: 'InvoiceType',
      payments: invoice.payments.map(p => ({
        ...p,
        messages: decodeMessages(p.messages),
      })),
    }));

    const resume = sortBy(
      [...mappedInvoices, ...mappedPayments],
      'date'
    ).reverse();

    return {
      offset: end,
      resume,
    };
  }
}
