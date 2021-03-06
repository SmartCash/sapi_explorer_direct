import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorComponentModule } from '../../components/error/error.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LoaderComponentModule } from '../../components/loader/loader.module';
import { TransactionDetailsEthComponentModule } from '../../components/transaction-details-eth/transaction-details-eth.module';
import { TransactionDetailsComponentModule } from '../../components/transaction-details/transaction-details.module';
import { TransactionSummaryEthComponentModule } from '../../components/transaction-summary-eth/transaction-summary-eth.module';
import { TransactionSummaryComponentModule } from '../../components/transaction-summary/transaction-summary.module';
import { CopyToClipboardModule } from '../../directives/copy-to-clipboard/copy-to-clipboard.module';
import { ExtPage } from './ext';

@NgModule({
  declarations: [ExtPage],
  imports: [
    IonicPageModule.forChild(ExtPage)
  ],
  exports: [ExtPage]
})
export class ExtPageModule {}
