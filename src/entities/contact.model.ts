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

  @Column("varchar", { nullable: false })
  phoneNumber: string;

  @Column("varchar", { nullable: false })
  email: string;

  @Column("int", { nullable: false })
  linkedId: number;

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
