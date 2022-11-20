import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { title, text, imageUrl, tags } = req.body;

        const doc = new Post({
            title,
            text,
            imageUrl,
            tags,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Post not created" });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate("user").exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Can not get the posts" });
    }
};
export const getLastTags = async (req, res) => {
    try {
        const posts = await Post.find().limit(5).exec();
        const tags = posts
            .map(obj => obj.tags)
            .flat()
            .slice(0, 5);
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Can not get the tags" });
    }
};

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { viewsCount: 1 }
        });

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Can not get post by id" });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, text, imageUrl, tags } = req.body;
        const post = await Post.findOneAndUpdate(req.params.id, {
            title,
            text,
            imageUrl,
            tags,
            user: req.userId
        });
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Can not get post by id" });
    }
};

export const removePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ msg: "Post not found" });

        await Post.findByIdAndRemove(req.params.id);
        res.json({ msg: "Post was removed" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to remove post"
        });
    }
};
