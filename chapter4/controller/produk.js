const {produk}= require('../models')

module.exports = {
    index : async (req,res,next)=>{
        try {
            const Produk = await produk.findAll();
            return res.status(200).json({
                status: true,
                message:'success',
                data:Produk
            });
        } catch (error) {
            next(error)
        }
    },
    store : async (req,res,next)=>{
        try {
            const{name,quantity} = req.body;
             const Produk = await produk.create({
                name:name,
                quantity:quantity   
             });
            return res.status(201).json({
                status: true,
                message:'success',
                data: Produk
            });
        } catch (error) {
            next(error)
        }
    },
    show: async (req,res,next)=>{
        try {
            const {id_produk} = req.params;

            const Produk = await produk.findOne({
                where:{id:id_produk}
            });

            if (!Produk){
                return res.status(401).json({
                    status: false,
                    message: `can't find produk with id ${id_produk}`,
                    data: null
                })
            }
            return res.status(200).json({
                status: true,
                message:'success',
                data: Produk
            });
        } catch (error) {
            next(error)
        }
    },
    update: async(req,res,next)=>{
        try {
            const {id_produk} = req.params;
            // const Channel = await channel.findOne({where:{id:channel_id}});

            const update =await produk.update(req.body,{where:{id:id_produk}});
            
            if (update[0] == 0){
                return res.status(404).json({
                    status: false,
                    message: `can't find produk with id ${id_produk}`,
                    data: null
                })
            }
            return res.status(201).json({
                status: true,
                message:"success",
                data: update
            })

        } catch (error) {
            next(error)
        }
    },
    destroy: async(req,res,next)=>{
        try {
            const {id_produk}=req.params;

            const deleted = await produk.destroy({where:{id:id_produk}})
            if(!deleted){
                return res.status(404).json({
                    status: false,
                    message:`can't find produk with id ${id_produk}`
                })
            }
            
            return res.status(200).json({
                status: true,
                message:'success',
                data: deleted
            });
        } catch (error) {
            next(error)
        }
    }
}