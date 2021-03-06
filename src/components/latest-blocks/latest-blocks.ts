import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorLoadTransaction } from '../../models/error';
import { ChainNetwork } from '../../providers/api/api';
import {
  AppBlock,
  BlocksProvider
} from '../../providers/blocks/blocks';
import { CurrencyProvider } from '../../providers/currency/currency';
import { DefaultProvider } from '../../providers/default/default';
import { RedirProvider } from '../../providers/redir/redir';

@Component({
  selector: 'latest-blocks',
  templateUrl: 'latest-blocks.html'
})
export class LatestBlocksComponent implements OnInit, OnDestroy {
  @Input()
  public numBlocks: number;
  @Input()
  public showAllBlocksButton = false;
  @Input()
  public isHomePage = false;
  @Input()
  public showTimeAs: string;
  @Input()
  public chainNetwork: ChainNetwork;
  public loading = true;
  public blocks: AppBlock[] = [];
  public subscriber: Subscription;
  public errorMessage: string;

  private reloadInterval: any;

  constructor(
    public currency: CurrencyProvider,
    public defaults: DefaultProvider,
    public redirProvider: RedirProvider,
    private blocksProvider: BlocksProvider,
    private ngZone: NgZone
  ) {
    this.numBlocks = parseInt(defaults.getDefault('%NUM_BLOCKS%'), 10);
  }

  public ngOnInit(): void {
    this.loadBlocks();
    const seconds = 15;
    this.ngZone.runOutsideAngular(() => {
      this.reloadInterval = setInterval(() => {
        this.ngZone.run(() => {
          this.loadBlocks.call(this);
        });
      }, 1000 * seconds);
    });
  }

  private loadBlocks(): void {    
    this.subscriber = this.blocksProvider
      .getBlocks()
      .subscribe(
        response => {
          const blocks = response.map(          
            (block: AppBlock) => {                           
                return block;
            }
          );
          this.blocks = blocks;
          
          if(this.blocks == null || this.blocks.length === 0){                        
            this.errorMessage = "Service temporarily unavailable: Loading block index...";
          }

          this.loading = false;
          if (this.blocks[this.blocks.length - 1].height < this.numBlocks) {
            this.isHomePage = false;
          }
        },
        err => {
          this.subscriber.unsubscribe();
          clearInterval(this.reloadInterval);
          this.errorMessage = "Service temporarily unavailable: Loading block index...";
          this.loading = false;
        }
      );    
  }

  public loadMoreBlocks(infiniteScroll) {
    clearInterval(this.reloadInterval);    
    return this.blocksProvider
      .pageBlocks()
      .subscribe(
        response => {
          const blocks = response.map(
            (block: AppBlock) => {
                return  block;
            }
          );
          this.blocks = this.blocks.concat(blocks);
          this.loading = false;
          // infiniteScroll.complete();
        },
        err => {
          this.errorMessage = err.message;
          this.loading = false;
        }
      );
  }

  public goToBlock(blockHash: string): void {  
    this.redirProvider.redir('block-detail', {
        blockHash
    });
  }

  public goToBlocks(): void {
    this.redirProvider.redir('blocks', {
      chain: this.chainNetwork.chain,
      network: this.chainNetwork.network
    });
  }

  public reloadData() {
    this.subscriber.unsubscribe();
    this.blocks = [];
    this.ngOnInit();
  }

  public ngOnDestroy(): void {
    clearInterval(this.reloadInterval);
  }
}
