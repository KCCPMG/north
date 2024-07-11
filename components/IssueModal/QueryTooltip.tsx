"use client";
import { Tooltip, Chip } from "@mui/material"
import { useState, useEffect } from "react"

type QueryTooltipProps = {
  textType: "string" | "tableRef" | "tablePropertyRef" | "pageRef" | "componentRef",
  text: string
}

export default function QueryTooltip({textType, text}: QueryTooltipProps) {

  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    fetch("/api/refSearch?query=" + new URLSearchParams(text))
    .then(res => {
      return res.json()
    }).then(json => {
      console.log(json);
    })
  }, [])

  return (
    <Tooltip
      title={"Ima tooltip"}
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