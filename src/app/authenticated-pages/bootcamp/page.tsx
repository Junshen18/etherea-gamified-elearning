'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function Bootcamp() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Web3 Development Fundamentals',
      instructor: 'John Doe',
      description: 'Learn the basics of Web3 development including Smart Contracts and DApps',
      price: 100, 
      thumbnail: '/bootcamp.png',
    },
    // Add more sample courses here
  ]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Web3 Masterclass</h1>
          <p className="text-gray-400">Learn from industry experts and earn while you learn</p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Course Thumbnail */}
              <div className="aspect-video bg-gray-700">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-white font-medium">{course.price} Tokens</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
