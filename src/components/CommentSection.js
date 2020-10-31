import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export const CommentSection = ({
  handleInputChange,
  handleSaveComment,
  repoId,
  comment,
  commentInput,
  hasError,
}) => {
  return (
    <FormControl className={""}>
      <InputLabel>Leave a comment...</InputLabel>
      <Input
        error={hasError("comment")}
        type="text"
        onChange={handleInputChange}
        value={comment || ""}
        name="comment"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleSaveComment(repoId)}
              disabled={!commentInput.isValid}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
