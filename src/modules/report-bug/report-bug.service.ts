import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBugReportDto } from './dto/create-report-bug.dto';

@Injectable()
export class ReportBugService {

    constructor (private prisma: PrismaService){}

    async createReportBug (user_id: number, createReportBugDto: CreateBugReportDto) {
        return await this.prisma.report_bugs.create({
            data: {
                title: createReportBugDto.title,
                description: createReportBugDto.description,
                user: {connect: {
                    user_id
                }}
            }
        })
    }

    async getReportBugs () {
        const reports = await this.prisma.report_bugs.findMany();
        if(!reports) {
            throw new HttpException("No Records", HttpStatus.NOT_FOUND);
        }
        return reports;
    }

    async deleteReportBug (id: number) {
        return this.prisma.report_bugs.delete({
            where: {bug_id: id}
        })
    }
}
