import { UpdateProductDto } from '../../dto/update-product.dto';

export class UpdateProductCommand {
    constructor(
        public readonly id: number,
        public readonly updateProductDto: UpdateProductDto,
    ) { }
}
