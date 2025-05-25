import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, default: 'General' })
  category: string;

  @Column({ type: 'varchar', length: 20, default: 'Medium' })
  priority: 'High' | 'Medium' | 'Low';

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed';

  @Column({ type: 'varchar', length: 50, nullable: true })
  ai_suggested_category: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ai_suggested_priority: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}