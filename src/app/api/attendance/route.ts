// import { NextRequest, NextResponse } from "next/server";
// import Attendance from "@/models/attendanceModel";
// import { connectDB } from "@/config/dbConfig";

// connectDB();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { userID, date, checkIn, checkOut, fullname } = reqBody;

//         const newAttendance = new Attendance({
//             userID,
//             date,
//             checkIn,
//             checkOut,
//             fullname
//         });

//         await newAttendance.save();

//         return NextResponse.json({
//             message: "Attendance saved successfully",
//             success: true,
//             newAttendance
//         }, { status: 201 });
//     } catch (error: any) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/models/attendanceModel";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userID, date, fullname } = reqBody;

        // Find the latest attendance record for the user
        const latestAttendance = await Attendance.findOne({
            userID,
        }).sort({ createdAt: -1 });

        if (latestAttendance) {
            // Get the date of the latest attendance record
            const latestDate = new Date(latestAttendance.createdAt);
            const currentDate = new Date();

            // Check if the latest attendance record is from today
            if (
                latestDate.getDate() === currentDate.getDate() &&
                latestDate.getMonth() === currentDate.getMonth() &&
                latestDate.getFullYear() === currentDate.getFullYear()
            ) {
                return NextResponse.json({
                    message: "You have already checked in for today",
                    success: false,
                }, { status: 400 });
            }
        }

        // No existing record found for today, proceed to save the new check-in time
        const currentTime = new Date().toLocaleTimeString();
        const newAttendance = new Attendance({
            userID,
            date,
            fullname,
            checkIn: currentTime,
        });

        await newAttendance.save();

        console.log(newAttendance);

        return NextResponse.json({
            message: "Attendance saved successfully",
            success: true,
            newAttendance
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userID, date, fullname } = reqBody;

        // Check if there is an existing attendance record for the user and date
        const existingAttendance = await Attendance.findOne({
            userID,
            date,
        });

        if (existingAttendance !== null) {
            if (existingAttendance.checkOut !== null) {
                // User has already checked out for today
                return NextResponse.json({
                    message: "You have already checked out for today",
                    success: true,
                    existingAttendance,
                }, { status: 200 });
            }

            // Update the check-out time
            existingAttendance.checkOut = new Date().toLocaleTimeString();
            await existingAttendance.save();

            return NextResponse.json({
                message: "You have successfully checked out for today",
                success: true,
                existingAttendance,
            }, { status: 200 });
        }

        // No existing record found, leave the check-out time as default
        const newAttendance = new Attendance({
            userID,
            date,
            fullname,
            checkIn: null,
            checkOut: new Date().toLocaleTimeString(),
        });

        await newAttendance.save();

        return NextResponse.json({
            message: "You have not checked in for today, but check out is recorded",
            success: true,
            newAttendance,
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const allAttendance = await Attendance.find().sort({ date: -1 });
        return NextResponse.json({
            message: "Attendance records fetched successfully",
            success: true,
            data: allAttendance,
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
