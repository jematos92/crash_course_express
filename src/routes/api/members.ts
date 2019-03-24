import express from "express";
import { members } from "../../repo/Members";
import { v4 as uuid } from "uuid";
import Member from "../../model/member";
const router = express.Router();

//Gets All Members.
router.get("/", (req, res) => {
  res.json(members);
});

// Get single member
router.get("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var member = members.find(x => x.id === id);
  if (member == null) {
    return res.status(400).json({ msg: `Member not found with ID: ${id}` });
  } else {
    res.json(member);
  }
});

//Create a member
router.post("/", (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).json({ msg: "email is required" });
  }
  if (!req.body.name) {
    return res.status(400).json({ msg: "name is required" });
  }
  // return data to customer
  var newMember: Member = {
    email: req.body.email,
    id: uuid(),
    name: req.body.name,
    status: "active"
  };
  members.push(newMember);
  res.json(newMember);
  // If you are rendering the view through server template, you
  //will need to redirect.
  //res.redirect("/");
});

// Update Member
router.put("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var member = members.find(x => x.id === id);
  if (member == null) {
    return res.status(400).json({ msg: `Member not found with ID: ${id}` });
  } else {
    var upMember = req.body;
    member.email = upMember.email ? upMember.email : member.email;
    member.name = upMember.name ? upMember.name : member.name;
    res.json({ msg: "Member updated", member: member });
  }
});

// Delete single member
router.delete("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var member = members.find(x => x.id === id);
  if (member == null) {
    return res.status(400).json({ msg: `Member not found with ID: ${id}` });
  } else {
    res.json({ msg: "Member Deleted" });
  }
});

export = router;
