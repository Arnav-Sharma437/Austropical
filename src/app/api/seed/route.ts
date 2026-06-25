import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    
    const existing = await User.findOne({ email: 'admin@austropical.com' });
    if (existing) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    await User.create({
      name: 'Admin',
      email: 'admin@austropical.com',
      password: hashedPassword,
      role: 'superadmin',
      isActive: true
    });

    return NextResponse.json({ message: 'Admin created successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
