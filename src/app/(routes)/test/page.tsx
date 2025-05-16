"use client";

import React from "react";
import { uploadProblems } from "./uploadProblems";

const TestPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div>빈 테스트 페이지입니다.</div>
      <button onClick={uploadProblems}>문제 업로드</button>
    </main>
  );
};

export default TestPage;
