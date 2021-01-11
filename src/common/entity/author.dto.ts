import { Directory } from './directory.dto';

export interface AuthorDto {
    _id: string;
    name: string;
    tags: string[];
    directorys: Directory['_id'][];
    score: number;
    last_read_date: number;
    read_time: number;
}
