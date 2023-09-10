-- CreateTable
CREATE TABLE "academic_semisters" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "tittle" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "startMonth" TEXT NOT NULL,
    "EndMonth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_semisters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_faculty" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_departments" (
    "id" TEXT NOT NULL,
    "titile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicFacultyId" TEXT NOT NULL,

    CONSTRAINT "academic_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ContactNo" TEXT NOT NULL,
    "gneder" TEXT NOT NULL,
    "bloodgroup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicSemisterId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "academicFacultyId" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "id" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ContactNo" TEXT NOT NULL,
    "gneder" TEXT NOT NULL,
    "bloodgroup" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "academicFacultyId" TEXT NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_departments_academicFacultyId_key" ON "academic_departments"("academicFacultyId");

-- AddForeignKey
ALTER TABLE "academic_departments" ADD CONSTRAINT "academic_departments_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicSemisterId_fkey" FOREIGN KEY ("academicSemisterId") REFERENCES "academic_semisters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
