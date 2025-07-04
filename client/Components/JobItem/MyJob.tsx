"use client";
import React, { useEffect, useState } from "react";
import { Job } from "@/types/types";
import { useJobs } from "@/context/jobsContext";
import Image from "next/image";
import { CardTitle } from "../ui/card";
import { formatDates } from "@/utils/fotmatDates";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";

interface JobProps {
  job: Job;
}

function MyJob({ job }: JobProps) {
  const { deleteJob, likeJob } = useJobs();
  const { profile, user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  const handleLike = (id: string) => {
    if (!user) return;
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    if (profile?.id) {
      setIsLiked(job.likes.includes(profile.id));
    }
  }, [job.likes, profile?.id]);

  return (
    <div className="p-8 bg-white rounded-xl flex flex-col gap-5">
      <div className="flex justify-between">
        <div
          className="flex items-center space-x-4 mb-2 cursor-pointer"
          onClick={() => router.push(`/job/${job.id}`)}
        >
          <Image
            alt={`logo`}
            src={job.profiles?.profile_picture || "/user.png"}
            width={48}
            height={48}
            className="rounded-full shadow-sm"
          />

          <div>
            <CardTitle className="text-xl font-bold truncate">
              {job.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {job.profiles?.name}
            </p>
          </div>
        </div>
        <button
          className={`text-2xl ${
            isLiked ? "text-[#7263f3]" : "text-gray-400"
          } `}
          onClick={() => handleLike(job.id)}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Posted {formatDates(job.created_at)}
        </p>

        <div className="flex justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          {job.created_by === profile?.id && (
            <div className="self-end">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Pencil size={14} />
                <span className="sr-only">Edit job</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-500"
                onClick={() => deleteJob(job.id)}
              >
                <Trash size={14} />
                <span className="sr-only">Delete job</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJob;