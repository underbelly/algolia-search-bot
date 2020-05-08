import { Block, Elements } from 'slack-blockify-types';

export class BlockBuilder {
  blocks: Block[];

  addBlock(block: Block) {
    this.blocks.push(block);
  }

  addDivider() {
    this.blocks.push({
      type: 'divider',
    });
  }

  addContext(elements: Elements[]) {
    this.blocks.push({
      type: 'context',
      elements,
    });
  }

  build() {
    return this.blocks;
  }
}
