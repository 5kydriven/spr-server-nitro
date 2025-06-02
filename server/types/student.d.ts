import { Curriculum } from './curriculum';

export interface Student {
	id?: string;
	email?: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	role?: string;
	address?: string;
	birthDate?: string;
	birthPlace?: string;
	course?: string;
	civilStatus?: string;
	studentMobileNumber?: string;
	sex?: string;
	year?: string;
	semester?: string;
	status?: string;
	parentName?: string;
	parentMobileNumber?: string;
	curriculum?: Curriculum;
	createdAt?: string;
}
