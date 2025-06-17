"use client";
import BlockBtnElement from "@/components/BlockBtnElement";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useBuilder } from "@/context/builder-provider";
import { FormBlocks } from "@/lib/form-utils/form-blocks";
import React, { useState } from "react";
import AIAssistanceBtn from "./AIAssistanceBtn";

const FormBlockBox = () => {
  const { formData } = useBuilder();
  const isPublished = formData?.published;

  const [search, setSearch] = useState<string>("");

  const filteredBlocks = Object.values(FormBlocks).filter((block) =>
    block.blockBtnElement.label?.toLowerCase().includes(search.toLowerCase())
  );

  const layoutBlocks = filteredBlocks.filter(
    (block) => block.blockCategory === "Layout"
  );

  const fieldBlocks = filteredBlocks.filter(
    (block) => block.blockCategory === "Field"
  );

  return (
    <div className="w-full">
      <div className="flex gap-2 py-4 text-sm">
        <Input
          placeholder="Search Blocks"
          className=" placeholder:text-gray-400 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AIAssistanceBtn />
      </div>
      <div
        className="flex flex-col 
      space-y-3
      w-full"
      >
        {layoutBlocks?.length > 0 && (
          <div className="mb-2">
            <h5
              className="text-[13px]
           text-gray-500 font-medium"
            >
              Layouts
            </h5>

            <div className="pt-1 grid grid-cols-3 gap-3">
              {layoutBlocks?.map((block) => (
                <BlockBtnElement
                  key={block.blockType}
                  formBlock={block}
                  disabled={isPublished}
                />
              ))}
            </div>
          </div>
        )}

        <Separator color="" className="!bg-gray-200" />
        <div>
          <h5
            className="text-[13px]
           text-gray-500 font-medium"
          >
            Fields
          </h5>

          <div className="pt-1 grid grid-cols-3 gap-3">
            {fieldBlocks?.map((block) => (
              <BlockBtnElement
                key={block.blockType}
                formBlock={block}
                disabled={isPublished}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBlockBox;
