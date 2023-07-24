import { IsEnum, IsOptional } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ContactType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { nullable: true })
  phoneNumber: string;

  @Column("varchar", { nullable: true })
  email: string;

  @IsOptional()
  @Column("int", { nullable: true })
  linkedId: number | null;

  @Column("enum", { enum: ContactType, nullable: false })
  type: ContactType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("timestamp", {
    nullable: true,
    default: null,
  })
  deletedAt: Date;
}

export class CreateContact {
  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  email: string;

  @IsOptional()
  linkedId: number | null;

  @IsEnum(ContactType)
  type: ContactType;
}
