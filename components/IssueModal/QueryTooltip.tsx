"use client";
import { Tooltip, Chip } from "@mui/material"
import { useState, useEffect } from "react"

type QueryTooltipProps = {
  textType: "string" | "tableRef" | "tablePropertyRef" | "pageRef" | "componentRef",
  text: string
}

export default function QueryTooltip({textType, text}: QueryTooltipProps) {

  const [searchResult, setSearchResult] = useState("")

  async function searchRef() {
    try {
      const response = await fetch("/api/refSearch?" + new URLSearchParams({
        query: text,
        ref: textType
      }))
      const json = await response.json();
      setSearchResult(json);
    } catch (err) {
      console.log(err);
      setSearchResult("Something went wrong");
    }
  }

  // useEffect(() => {
  //   searchRef();
  // }, [])

  return (
    <Tooltip
      title={
        searchResult
      }
      onMouseEnter={searchRef}
    >
      <Chip 
        variant="outlined"
        size="small" 
        color="primary" 
        label={text}
      />
    </Tooltip>
  )
}