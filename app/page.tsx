"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Hero } from "./components/hero/hero";
import { Insights } from "./components/insights/Insights";
import { Navbar } from "./components/navbar/navbar";
import "./page.css";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="app-wrapper">
          <Navbar />
          <main>
            <Header />
            <Hero />
            <Insights />
          </main>
        </div>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
