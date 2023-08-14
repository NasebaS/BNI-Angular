
import { Service } from "./service.model";
export class Block {
    blockId: number;
    blockName: string;
    districtId: number;

    static getBlockList(response): Block[] {
        let blockResponse = response.data;
        var blocks: Block[] = [];

        blockResponse.forEach(blockData => {
            let block = new Block();
            block.blockId = blockData.id;
            block.blockName = blockData.name;
            block.districtId=blockData.districtId;
            blocks.push(block);
        });
        return blocks;
    }
}



