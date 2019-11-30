import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ParkingSpot {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    status: boolean;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    isForHandicap: boolean;
}
