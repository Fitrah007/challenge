const {produk}= require('../models')
const {komponen}= require('../models')
const {produk_komponen}= require('../models')

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
            const ready = await produk.findOne({where: {name:name}})
            //  if(!name || !quantity){
                //     return res.status(401).json({
                    //     status: false,
                    //     message:'name and quantity is required!',
                    //     data: null
                    // });
                    //  }
                    if(ready){
                        return res.status(404).json({
                            status: false,
                            message:'produk is already exist!',
                            data: null
                        });
                    }
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
    },
    connect: async (req, res, next) => {
        try {
            const {id_komponen, id_produk} = req.body;
    
            const Komponen = await komponen.findOne({where: {id: id_komponen}});
            const Produk = await produk.findOne({where: {id: id_produk}});
            if (!Komponen || !Produk) {
                return res.status(404).json({
                    status: false,
                    message: `id_komponen and id_produk must be a valid id!`,
                    data: null
                });
            }
    
            const isConnected = await produk_komponen.findOne({where: {id_produk, id_komponen}});
            if (isConnected) {
                return res.status(400).json({
                    status: false,
                    message: `already connected!`,
                    data: null
                });
            }
    
            const Connection = await produk_komponen.create({id_komponen, id_produk});
            return res.status(201).json({
                status: true,
                message: 'success',
                data: Connection
            });
        } catch (error) {
            next(error);
        }
    }
}