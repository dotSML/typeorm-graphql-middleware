import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import UserEntity from './UserEntity';

@Entity('posts')
export default class PostEntity extends BaseEntity {
	@PrimaryGeneratedColumn() public id: string;

	@Column({ type: 'varchar', nullable: false, length: 255 })
	public name: string;

	@ManyToOne(_ => UserEntity, user => user.posts)
	public user: Promise<UserEntity>;
}
