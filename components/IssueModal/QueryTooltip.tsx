"use client";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Fragment, useState } from "react";
import { useTheme } from "@mui/material";
import TooltipIssueCard from "./TooltipIssueCard";"./TooltipIssueCard";

type QueryTooltipProps = {
  textType: "string" | "tableRef" | "tablePropertyRef" | "pageRef" | "componentRef",
  text: string
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 1)',
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(18),
    border: '1px solid #dadde9',
  },
}));

export default function QueryTooltip({ textType, text }: QueryTooltipProps) {

  const theme = useTheme();
  const [searchResult, setSearchResult] = useState(<span>Searching...</span>)

  async function searchRef() {
    try {
      const response = await fetch("/api/refSearch?" + new URLSearchParams({
        query: text,
        ref: textType
      }))
      const json = await response.json();

      if (json === "Document not found") {
        setSearchResult(
          <>
            <Typography color={theme.palette.error.main} variant="h4">
              Broken dependency - This document does not exist
            </Typography>
          </>
        )
      }

      else if (textType === "tableRef" && json.table) {}

      else if ((textType === "pageRef" || textType=== "componentRef") && json.issue) {
        const { issue } = json;
        const { issueType, name, description, assigned_designers, assigned_engineers } = issue;
        setSearchResult(
          <TooltipIssueCard 
            issueType={issueType}
            description={description}
            assigned_designers={assigned_designers}
            assigned_engineers={assigned_engineers}
          />
        )
      }

      else if (textType === "tablePropertyRef" && json.tableProperty) {
        const { tableProperty } = json;
        setSearchResult(
          <Fragment>
            <Typography variant="h4">
              {tableProperty.table.name || ""}
            </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Field Type</TableCell>
                    <TableCell>Special</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ borderBottom: "none" }}>{tableProperty.field}</TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>{tableProperty.field_type}</TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>{tableProperty.special}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
          </Fragment>
        )
      }

    } catch (err) {
      console.log(err);
      setSearchResult(<span>Something went wrong</span>);
    }
  }

  return (
    <HtmlTooltip
      title={
        searchResult
      }
      placement="right"
      onMouseEnter={searchRef}
    >
      <Chip
        variant="outlined"
        size="small"
        color="primary"
        label={text}
      />
    </HtmlTooltip>
  )
}