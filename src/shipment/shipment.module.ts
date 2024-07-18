import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shipment } from './entities/shipment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Shipment])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {}
